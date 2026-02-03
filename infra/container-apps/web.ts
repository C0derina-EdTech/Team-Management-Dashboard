import * as app from "@pulumi/azure-native/app";
import { containerAppEnv } from "./environment";
import { resourceGroup } from "../core/resourceGroup";

export function createWebApp(name: string, image: string) {
    return new app.ContainerApp(name, {
        resourceGroupName: resourceGroup.name,
        managedEnvironmentId: containerAppEnv.id,
        configuration: {
            ingress: {
                external: true,
                targetPort: 3000,
            },
        },
        template: {
            containers: [{
                name,
                image,
            }],
        },
    });
}
