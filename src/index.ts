import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";
import { openAPIRouteHandler, describeRoute } from "hono-openapi";
import { log } from "./middlewares/logger";

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
              example: "bloop hono template!",
            },
          },
        },
      },
    },
  }),
  (c) => {
    return c.text("bloop hono template!");
  },
);

app.get(
  "/doc",
  openAPIRouteHandler(app, {
    documentation: {
      info: {
        title: "Hono bun template API from bloop",
        version: "1.0.0",
        description: "Hono bun template",
      },
      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  }),
);

app.get("/scalar", Scalar({ url: "/doc" }));

export default app;
