import Fastify from "fastify";
import { prisma } from "./lib/db.js";


const app = Fastify({ logger: true });

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
