import * as storage from "@pulumi/azure-native/storage";
import { resourceGroup } from "../core/resourceGroup";

export const storageAccount = new storage.StorageAccount("storage", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "Standard_LRS" },
    kind: "StorageV2",
    allowBlobPublicAccess: false,
});

export const uploadsContainer = new storage.BlobContainer("uploads", {
    resourceGroupName: resourceGroup.name,
    accountName: storageAccount.name,
});
