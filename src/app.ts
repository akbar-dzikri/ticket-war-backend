import Fastify from "fastify";
import { prisma } from "./lib/db.js";


const app = Fastify({ logger: true });

app.get("/", (request, reply) => {
  return { msg: "ok" };
});


export default app;
