import { UserCreateInput } from "#/lib/prisma/generated/models.js";
import { prisma } from "#/lib/db.js";
import bcrypt from "bcrypt";

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
    const error = new Error("User not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(
    payload.password,
    foundUser.password
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    (error as any).statusCode = 401;
    throw error;
  }

  // Remove password from response
  delete (foundUser as { password?: string }).password;
  return foundUser;
}
