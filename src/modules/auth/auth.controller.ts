import { FastifyReply, FastifyRequest } from "fastify";
import { authRegisterService } from "./auth.service.js";

export async function handleRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as {
    email: string;
    password: string;
  };

  const registeredUser = await authRegisterService(body);
  reply.code(201).send(registeredUser);
}
