import Fastify from "fastify";
import jwt from "./plugins/jwt.js";

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
app.register(jwt);

app.get("/", (request, reply) => {
  return { msg: "ok" };
});

export default app;
