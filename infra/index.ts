import "./core/resourceGroup";
import "./core/acr";
import "./core/logs";
import "./data/postgres";
import "./data/storage";
import "./container-apps/environment";
import "./container-apps/api";

// Example web apps
// import { createWebApp } from "./container-apps/web";

// createWebApp("check-in", "acr.azurecr.io/checkin:latest");
// createWebApp("admin", "acr.azurecr.io/admin:latest");
// createWebApp("client", "acr.azurecr.io/client:latest");
import { createStaticWebApp } from "./container-apps/staticWeb";

export const checkInApp = createStaticWebApp("check-in");
// createStaticWebApp("admin");
// createStaticWebApp("client");
