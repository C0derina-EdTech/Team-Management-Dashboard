import * as app from "@pulumi/azure-native/app";
import { resourceGroup } from "../core/resourceGroup";
import { workspace, sharedKeys } from "../core/logs";
import { location } from "../config";

export const containerAppEnv = new app.ManagedEnvironment("env", {
    resourceGroupName: resourceGroup.name,
    location,
    appLogsConfiguration: {
        destination: "log-analytics",
        logAnalyticsConfiguration: {
            customerId: workspace.customerId,
            sharedKey: sharedKeys.apply(k => k.primarySharedKey!),
        },
    },
});
