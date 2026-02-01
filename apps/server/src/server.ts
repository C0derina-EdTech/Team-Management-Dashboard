import { join } from "node:path"
import { bearer } from "@elysiajs/bearer"
import { cors } from "@elysiajs/cors"
import { openapi } from "@elysiajs/openapi"
import { opentelemetry } from "@elysiajs/opentelemetry"
import { serverTiming } from "@elysiajs/server-timing"
import { Elysia } from "elysia"
import { autoload } from "elysia-autoload"
import { healthcheckPlugin } from "elysia-healthcheck"
import { Logestic } from "logestic"
import { auth, OpenAPI } from "./auth/auth.js"

export const app = new Elysia()
  .use(bearer())
  .use(cors())
  .use(serverTiming())
  .use(opentelemetry())
  .use(
    healthcheckPlugin({
      prefix: "/health",
    }),
  )
  .use(
    await autoload({
      dir: join(import.meta.dir, "routes"),
    }),
  )
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
        info: {
          title: "Coderina Event Management API",
          version: "v1.0.0",
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Local development server",
          },
          {
            url: "https://api.coderina.org",
            description: "Production server",
          },
        ],
      },
      // references: fromTypes(process.env.NODE_ENV === "production"
      //   ? "dist/index.d.ts"
      //   : "src/index.ts"),
    }),
  )
  .use(Logestic.preset("common"))
  .mount(auth.handler)

export type ElysiaApp = typeof app
