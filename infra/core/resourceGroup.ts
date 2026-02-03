import * as resources from "@pulumi/azure-native/resources";
import { location, tags } from "../config";

export const resourceGroup = new resources.ResourceGroup("rg", {
    location,
    tags,
});
