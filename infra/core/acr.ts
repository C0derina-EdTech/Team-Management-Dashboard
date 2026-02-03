import * as acr from "@pulumi/azure-native/containerregistry";
import { resourceGroup } from "./resourceGroup";

export const registry = new acr.Registry("acr", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "Basic" },
    adminUserEnabled: true,
});
