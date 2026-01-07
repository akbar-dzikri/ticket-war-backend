import { UserCreateInput } from "#/lib/prisma/generated/models.js";
import { prisma } from "#/lib/db.js";
import bcrypt from "bcrypt";

export async function authRegisterService(payload: UserCreateInput) {
  const newUser = await prisma.user.create({
    data: { ...payload, password: await bcrypt.hash(payload.password, 10) },
  });
  return newUser;
}
