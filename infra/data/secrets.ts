import * as keyvault from "@pulumi/azure-native/keyvault";
import { vault } from "../core/keyVault";
import { dbPassword } from "./postgres";
import { resourceGroup } from "../core/resourceGroup";

export const dbPasswordSecret = new keyvault.Secret("db-password", {
    resourceGroupName: resourceGroup.name,
    vaultName: vault.name,
    properties: {
        value: dbPassword.result,
    },
});
