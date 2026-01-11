import { UserCreateInput } from "#/lib/prisma/generated/models.js";
import { prisma } from "#/lib/db.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

export async function authRegisterService(payload: UserCreateInput) {
  const newUser = await prisma.user.create({
    data: { ...payload, password: await bcrypt.hash(payload.password, 10) },
  });

  delete (newUser as { password?: string }).password; // Bypasses type error

  return {
    ...newUser,
  };
}

export async function authLoginService(payload: UserCreateInput) {
  const foundUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!foundUser) {
    throw createHttpError(404, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    payload.password,
    foundUser.password
  );

  if (!isPasswordValid) {
    throw createHttpError(401, "Invalid credentials");
  }
  const { password, ...user } = foundUser;
  return user;
}
