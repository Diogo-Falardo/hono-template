import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";
import { openAPIRouteHandler, describeRoute } from "hono-openapi";
import { log } from "./middlewares/logger.ts";

const app = new Hono();

app.use(
  "*",
  logger((str, c) => {
    log.info(str);
  }),
  cors(),
);

app.get(
  "/",
  describeRoute({
    summary: "Root endpoint",
    description: "Returns a welcome message as plain text",
    responses: {
      200: {
        description: "success response",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              example: "Hono deno template!",
            },
          },
        },
      },
    },
  }),
  (c) => {
    return c.text("Hono deno template!");
  },
);

app.get(
  "/doc",
  openAPIRouteHandler(app, {
    documentation: {
      info: {
        title: "Hono deno template API from bloop",
        version: "1.0.0",
        description: "Hono deno template",
      },
      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  }),
);

app.get("/scalar", Scalar({ url: "/doc" }));

export default app;
