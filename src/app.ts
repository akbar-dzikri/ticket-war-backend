import Fastify from "fastify";
import jwt from "./plugins/jwt.js";

const app = Fastify({ logger: true });

app.register(jwt);

app.get("/", (request, reply) => {
  return { msg: "ok" };
});

export default app;
