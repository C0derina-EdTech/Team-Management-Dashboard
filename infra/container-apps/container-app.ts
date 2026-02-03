import * as app from "@pulumi/azure-native/app";
import * as pulumi from "@pulumi/pulumi";
import * as authorization from "@pulumi/azure-native/authorization";
import { containerAppEnv } from "./environment";
import { registry } from "../core/acr";
import { vault } from "../core/keyVault";
import { containerResources } from "../config";
import { resourceGroup } from "../core/resourceGroup";
import { postgresServer } from "../data/postgres";
import { EnvironmentVariableType } from "@pulumi/azure-native/types/enums/awsconnector";

interface ContainerAppArgs {
    name: string;
    image: pulumi.Input<string>;
    // envVars?: ContainerAppArgs[];
    envVars?: { name: string; value: pulumi.Input<string> | { secretRef: string } }[];
    secrets?: { name: string; keyVaultUrl?: pulumi.Input<string>; value?: pulumi.Input<string> }[];
    targetPort?: number;
}

/**
 * Create a reusable Elysia API Container App
 */
export function createContainerApp({
    name,
    image,
    envVars = [],
    secrets = [],
    targetPort = 3000,
}: ContainerAppArgs) {
    const containerApp = new app.ContainerApp(name, {
        resourceGroupName: resourceGroup.name,
        managedEnvironmentId: containerAppEnv.id,
        identity: {
            type: "SystemAssigned",
        },
        configuration: {
            ingress: {
                external: true,
                targetPort,
            },
            registries: [
                {
                    server: registry.loginServer,
                    identity: "system", // uses managed identity
                },
            ],
            secrets: secrets.map(s => ({
                ...s,
                identity: "system", // Key Vault access via managed identity
            })),
        },
        template: {
            containers: [
                {
                    name,
                    image,
                    resources: containerResources,
                    env: envVars.map(v =>
                        "secretRef" in v
                            ? { name: v.name, secretRef: (v as any).secretRef }
                            : { name: v.name, value: v.value }
                    ),
                },
            ],
        },
    });

    // Grant the Container App's system-assigned identity access to all Key Vault secrets
    secrets.forEach(s => {
        if (s.keyVaultUrl) {
            new authorization.RoleAssignment(`${name}-kv-access-${s.name}`, {
                principalId: containerApp.identity.apply(i => i!.principalId!),
                roleDefinitionId:
                    "/providers/Microsoft.Authorization/roleDefinitions/4633458b-17de-408a-b874-0445c86b69e6", // Key Vault Secrets User
                scope: vault.id,
                principalType: "ServicePrincipal",
            });
        }
    });

    // Grant pull access to ACR
    new authorization.RoleAssignment(`${name}-acr-pull`, {
        principalId: containerApp.identity.apply(i => i!.principalId!),
        roleDefinitionId:
            "/providers/Microsoft.Authorization/roleDefinitions/7f951dda-4ed3-4680-a7ca-43fe172d538d", // AcrPull
        scope: registry.id,
        principalType: "ServicePrincipal",
    });

    return containerApp;
}
