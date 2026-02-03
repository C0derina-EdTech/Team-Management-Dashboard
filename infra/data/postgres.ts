import * as postgres from "@pulumi/azure-native/dbforpostgresql";
import * as random from "@pulumi/random";
import { resourceGroup } from "../core/resourceGroup";
import { location } from "../config";

export const dbPassword = new random.RandomPassword("pg-password", {
    length: 20,
    special: true,
});

export const postgresServer = new postgres.Server("postgres", {
    resourceGroupName: resourceGroup.name,
    location,
    version: "16",
    administratorLogin: "adminuser",
    administratorLoginPassword: dbPassword.result,
    sku: {
        name: "Standard_B1ms",
        tier: "Burstable",
    },
    storage: {
        storageSizeGB: 32,
    },
    backup: {
        backupRetentionDays: 7,
    },
});
