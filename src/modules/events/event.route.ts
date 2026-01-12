import { FastifyInstance } from "fastify";
import {
  createEventHandler,
  getAllEventsHandler,
  getEventDetailsHandler,
} from "./event.controller.js";

async function eventRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [app.authenticate] }, createEventHandler);

  app.get("/", getAllEventsHandler);
  app.get("/:id", getEventDetailsHandler);
}

export { eventRoutes };
