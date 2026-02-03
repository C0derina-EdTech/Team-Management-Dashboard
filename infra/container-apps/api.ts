import * as app from "@pulumi/azure-native/app";
import { containerAppEnv } from "./environment";
import { registry } from "../core/acr";
import { postgresServer } from "../data/postgres";
import { containerResources } from "../config";
import { resourceGroup } from "../core/resourceGroup";

export const apiApp = new app.ContainerApp("api", {
    resourceGroupName: resourceGroup.name,
    managedEnvironmentId: containerAppEnv.id,
    configuration: {
        ingress: {
            external: true,
            targetPort: 3000,
        },
        registries: [{
            server: registry.loginServer,
            username: registry.name,
            passwordSecretRef: "acr-password",
        }],
        secrets: [
            { name: "acr-password", value: registry.name },
            { name: "db-password", keyVaultUrl: "https://kv.vault.azure.net/secrets/db-password" },
        ],
    },
    template: {
        containers: [{
            name: "api",
            image: "acr.azurecr.io/api:latest",
            resources: containerResources,
            env: [
                { name: "DB_HOST", value: postgresServer.fullyQualifiedDomainName },
                { name: "DB_PASSWORD", secretRef: "db-password" },
            ],
        }],
    },
});
