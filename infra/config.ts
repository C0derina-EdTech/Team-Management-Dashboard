import * as pulumi from "@pulumi/pulumi";

const cfg = new pulumi.Config();

export const projectName = pulumi.getProject();
export const stackName = pulumi.getStack();

export const location = cfg.get("location") ?? "westeurope";

export const tags = {
    project: projectName,
    stack: stackName,
};
export const stack = pulumi.getStack();

export const postgresSku = cfg.require("postgresSku");

export const containerResources = {
    cpu: cfg.requireNumber("containerCpu"),
    memory: cfg.require("containerMemory"),
};