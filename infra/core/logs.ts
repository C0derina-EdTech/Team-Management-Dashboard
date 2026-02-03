import * as operationalinsights from "@pulumi/azure-native/operationalinsights";
import * as pulumi from "@pulumi/pulumi";
import { resourceGroup } from "./resourceGroup";

export const workspace = new operationalinsights.Workspace("logs", {
    resourceGroupName: resourceGroup.name,
    sku: { name: "PerGB2018" },
});

export const sharedKeys = pulumi
    .all([resourceGroup.name, workspace.name])
    .apply(([rg, name]) =>
        operationalinsights.getSharedKeys({
            resourceGroupName: rg,
            workspaceName: name,
        })
    );
