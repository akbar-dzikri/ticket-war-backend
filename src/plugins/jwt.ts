import "dotenv/config";

import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: process.env["JWT_SECRET"] ?? "secret_default",
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        reply.send(error);
      }
    }
  );
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; email: string; role: string };
    user: { id: number; email: string; role: string };
  }
}
