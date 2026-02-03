import * as web from "@pulumi/azure-native/web";
import { resourceGroup } from "../core/resourceGroup";
import { location } from "../config";

export function createStaticWebApp(name: string) {
    return new web.StaticSite(name, {
        resourceGroupName: resourceGroup.name,
        location,
        sku: {
            name: "Standard",
            tier: "Standard",
        },
        repositoryUrl: "https://github.com/C0derina-EdTech/Team-Management-Dashboard",
        branch: "main",
        buildProperties: {
            appLocation: "apps/" + name,
            outputLocation: ".next",
        },
    });
}
