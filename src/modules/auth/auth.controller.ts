import { FastifyReply, FastifyRequest } from "fastify";
import { authLoginService, authRegisterService } from "./auth.service.js";
import { UserCreateInput } from "#/lib/prisma/generated/models.js";
import { OmitOptional } from "#/lib/types.js";

export async function handleRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as UserCreateInput;

  const registeredUser = await authRegisterService(body);
  return reply.code(201).send(registeredUser);
}

export async function handleLogin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = request.body as OmitOptional<UserCreateInput>;

  const user = await authLoginService(body);
  const token = await reply.jwtSign(
    { id: user.id, email: user.email, role: user.role },
    { expiresIn: "7d" }
  );
  return reply.code(200).send({ token, user });
}
