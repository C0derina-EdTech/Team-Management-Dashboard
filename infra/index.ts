import "./core/resourceGroup";
import "./core/acr";
import "./core/logs";
import "./data/postgres";
import "./data/storage";
import "./container-apps/environment";
import "./container-apps/api";


export const checkInApp = createStaticWebApp("check-in");

// Create the API
import { createContainerApp } from "./container-apps/container-app";
import { createStaticWebApp } from "./container-apps/staticWeb";
import { postgresServer } from "./data/postgres";
import * as pulumi from "@pulumi/pulumi";

// Create the API
const api = createContainerApp({
    name: "api",
    targetPort: 3000,
    secrets: [
        { name: "db-password", keyVaultSecretName: "db-password" },
    ],
    // env: [
    //     { name: "DB_HOST", value: postgresServer.fullyQualifiedDomainName },
    //     { name: "DB_PASSWORD", secretRef: "db-password" },
    // ],
});

// Create a static web app
const checkIn = createStaticWebApp("check-in");

// Export URLs
export const apiUrl = api.url;
export const checkInUrl = checkIn.defaultHostname.apply(h => `https://${h}`);
