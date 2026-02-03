import * as app from "@pulumi/azure-native/app";
import * as pulumi from "@pulumi/pulumi";
import * as appTypes from "@pulumi/azure-native/types/input";
import * as authorization from "@pulumi/azure-native/authorization";
import { containerAppEnv } from "./environment";
import { registry } from "../core/acr";
import { containerResources } from "../config";
import { resourceGroup } from "../core/resourceGroup";
import { vault } from "../core/keyVault";

export interface ContainerAppConfig {
    name: string;
    targetPort: number;
    image?: string;
    env?: appTypes.app.EnvironmentVarArgs[];
    secrets?: {
        name: string;
        keyVaultSecretName: string;
    }[];
    external?: boolean;
}

export interface ContainerAppResult {
    app: app.ContainerApp;
    url: pulumi.Output<string>;
}

export function createContainerApp(config: ContainerAppConfig): ContainerAppResult {
    const {
        name,
        targetPort,
        image,
        env = [],
        secrets = [],
        external = true,
    } = config;

    const secretsConfig = secrets.map(s => ({
        name: s.name,
        keyVaultUrl: pulumi.interpolate`https://${vault.name}.vault.azure.net/secrets/${s.keyVaultSecretName}`,
        identity: "system",
    }));

    const containerApp = new app.ContainerApp(name, {
        resourceGroupName: resourceGroup.name,
        managedEnvironmentId: containerAppEnv.id,
        identity: {
            type: "SystemAssigned",
        },
        configuration: {
            ingress: {
                external,
                targetPort,
            },
            registries: [{
                server: registry.loginServer,
                identity: "system",
            }],
            secrets: secretsConfig.length > 0 ? secretsConfig : undefined,
        },
        template: {
            containers: [{
                name,
                image: image ?? pulumi.interpolate`${registry.loginServer}/${name}:latest`,
                resources: containerResources,
                env: env.length > 0 ? env : undefined,
            }],
        },
    });

    if (secrets.length > 0) {
        new authorization.RoleAssignment(`${name}-keyvault-secrets`, {
            principalId: containerApp.identity.apply(i => i!.principalId!),
            roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/4633458b-17de-408a-b874-0445c86b69e6",
            scope: vault.id,
            principalType: "ServicePrincipal",
        });
    }

    new authorization.RoleAssignment(`${name}-acr-pull`, {
        principalId: containerApp.identity.apply(i => i!.principalId!),
        roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/7f951dda-4ed3-4680-a7ca-43fe172d538d",
        scope: registry.id,
        principalType: "ServicePrincipal",
    });

    // Build the URL from the FQDN
    const url = pulumi.interpolate`https://${containerApp.configuration.apply(c => c?.ingress?.fqdn ?? "")}`;

    return { app: containerApp, url };
}