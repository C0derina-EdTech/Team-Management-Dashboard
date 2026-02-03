import * as keyvault from "@pulumi/azure-native/keyvault";
import * as authorization from "@pulumi/azure-native/authorization";
import { resourceGroup } from "./resourceGroup";
import { location } from "../config";

const clientConfig = authorization.getClientConfig();

export const vault = new keyvault.Vault("kv", {
    resourceGroupName: resourceGroup.name,
    location,
    properties: {
        tenantId: clientConfig.then(c => c.tenantId),
        sku: {
            family: "A",
            name: "standard",
        },
        enableRbacAuthorization: true,
    },
});

