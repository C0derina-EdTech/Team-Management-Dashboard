import * as app from "@pulumi/azure-native/app";
import * as pulumi from "@pulumi/pulumi";
import * as authorization from "@pulumi/azure-native/authorization";
import { containerAppEnv } from "./environment";
import { registry } from "../core/acr";
import { postgresServer } from "../data/postgres";
import { containerResources } from "../config";
import { resourceGroup } from "../core/resourceGroup";
import { vault } from "../core/keyVault";

export const apiApp = new app.ContainerApp("api", {
    resourceGroupName: resourceGroup.name,
    managedEnvironmentId: containerAppEnv.id,
    identity: {
        type: "SystemAssigned",
    },
    configuration: {
        ingress: {
            external: true,
            targetPort: 3000,
        },
        registries: [{
            server: registry.loginServer,
            identity: "system",
        }],
        secrets: [
            {
                name: "db-password",
                keyVaultUrl: pulumi.interpolate`https://${vault.name}.vault.azure.net/secrets/db-password`,
                identity: "system",  // ADD THIS LINE
            },
        ],
    },
    template: {
        containers: [{
            name: "api",
            image: pulumi.interpolate`${registry.loginServer}/api:latest`,
            resources: containerResources,
            env: [
                { name: "DB_HOST", value: postgresServer.fullyQualifiedDomainName },
                { name: "DB_PASSWORD", secretRef: "db-password" },
            ],
        }],
    },
});

// Grant the Container App's managed identity access to Key Vault secrets
new authorization.RoleAssignment("api-keyvault-secrets", {
    principalId: apiApp.identity.apply(i => i!.principalId!),
    roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/4633458b-17de-408a-b874-0445c86b69e6", // Key Vault Secrets User
    scope: vault.id,
    principalType: "ServicePrincipal",
});

new authorization.RoleAssignment("api-acr-pull", {
    principalId: apiApp.identity.apply(i => i!.principalId!),
    roleDefinitionId: "/providers/Microsoft.Authorization/roleDefinitions/7f951dda-4ed3-4680-a7ca-43fe172d538d",
    scope: registry.id,
    principalType: "ServicePrincipal",
});