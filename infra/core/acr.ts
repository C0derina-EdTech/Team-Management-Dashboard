import * as containerregistry from "@pulumi/azure-native/containerregistry";
import { resourceGroup } from "./resourceGroup";

export const registry = new containerregistry.Registry("acr", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "Basic" },
    adminUserEnabled: false,
});
