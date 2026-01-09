import type { FastifyInstance } from "fastify";
import { handleLogin, handleRegister } from "./auth.controller.js";

async function authRoutes(app: FastifyInstance) {
  app.post("/register", handleRegister);

  app.post("/login", handleLogin);
}

export { authRoutes };
