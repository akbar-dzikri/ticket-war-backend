import "dotenv/config";

import Fastify from "fastify";
import { prisma } from "./lib/db.js";
import fastifyJwt from "@fastify/jwt";
const app = Fastify({ logger: true });

app.register(fastifyJwt, {
  secret: process.env["JWT_SECRET"] ?? "default_secret",
});
app.get("/", (request, reply) => {
  return { msg: "ok" };
});

app.get("/test-db", async (request, reply) => {
  const users = await prisma.user.findMany();
  return reply.code(200).send({
    users,
  });
});

export default app;
