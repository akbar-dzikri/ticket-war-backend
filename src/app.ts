import Fastify from "fastify";
import jwt from "./plugins/jwt.js";
import { authRoutes } from "./modules/auth/auth.route.js";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const environment = (process.env.NODE_ENV || "production") as
  | "development"
  | "production"
  | "test";
const app = Fastify({ logger: envToLogger[environment] ?? true });

await app.register(jwt)
await app.register(authRoutes, { prefix: "/api/auth" });

app.get("/", (request, reply) => {
  return { msg: "ok" };
});

app.log.info(app.authenticate)

app.get("/protected", { onRequest: [app.authenticate] }, (request, reply) => {
  return { msg: "you are auth'd", user: request.user };
});

export default app;
