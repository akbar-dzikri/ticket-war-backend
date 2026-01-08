import type { FastifyInstance } from "fastify";
import { handleRegister } from "./auth.controller.js";

async function authRoutes(app: FastifyInstance) {
  app.post("/register", handleRegister);
}

export { authRoutes };
