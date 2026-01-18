import { EventCreateInput } from "#/lib/prisma/generated/models.js";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  bookEvent,
  createEvent,
  getEventById,
  getEvents,
} from "./event.service.js";

export async function createEventHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.user.id;
  const body = request.body as EventCreateInput;

  const createdEvent = await createEvent(body, userId);
  return reply.code(201).send(createdEvent);
}

export async function getAllEventsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const events = await getEvents();
  return reply.code(200).send(events);
}

export async function getEventDetailsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const event = await getEventById(+id);
  return reply.code(200).send(event);
}

export async function bookEventHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const userId = request.user.id;

  const result = await bookEvent(+id, userId);

  return reply.code(201).send(result);
}
