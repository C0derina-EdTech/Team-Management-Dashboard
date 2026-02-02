import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as azure from "@pulumi/azure-native";
import * as random from "@pulumi/random";

const config = new pulumi.Config();

// 1. Resource Group
const resourceGroup = new azure.resources.ResourceGroup("coderina-ams-rg");

// 2. Container Registry (for Docker images)
const registry = new azure.containerregistry.Registry("acr", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "Basic" },
    adminUserEnabled: true,
});

// 3. PostgreSQL Flexible Server
const dbPassword = new random.RandomPassword("db-password", { length: 20 });
const postgresServer = new azure.dbforpostgresql.Server("postgres", {
    resourceGroupName: resourceGroup.name,
    version: "16",
    administratorLogin: "adminuser",
    administratorLoginPassword: dbPassword.result,
    sku: { name: "Standard_B1ms", tier: "Burstable" },
    storage: { storageSizeGB: 32 },
});

// 4. Storage Account (S3 replacement)
const storageAccount = new azure.storage.StorageAccount("storage", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "Standard_LRS" },
    kind: "StorageV2",
});

const blobContainer = new azure.storage.BlobContainer("uploads", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
});

// 5. Container Apps Environment
const logAnalytics = new azure.operationalinsights.Workspace("logs", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "PerGB2018" },
});

const containerAppsEnv = new azure.app.ManagedEnvironment("env", {
    resourceGroupName: resourceGroup.name,
    appLogsConfiguration: {
        destination: "log-analytics",
        logAnalyticsConfiguration: {
            customerId: logAnalytics.customerId,
            sharedKey: logAnalytics.primarySharedKey,
        },
    },
});
