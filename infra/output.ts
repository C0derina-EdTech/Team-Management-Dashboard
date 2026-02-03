import { apiApp } from "./container-apps/api";
import * as pulumi from "@pulumi/pulumi";


/**
 * =========================
 * API SERVER URL
 * =========================
 *
 * Azure Container Apps expose FQDN after creation
 */
export const apiUrl = pulumi.interpolate`https://${apiApp.configuration.apply(
    c => c?.ingress?.fqdn
)}`;