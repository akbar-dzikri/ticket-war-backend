import { prisma } from "#/lib/db.js";
import { EventCreateInput } from "#/lib/prisma/generated/models.js";
import createHttpError from "http-errors";

export async function createEvent(payload: EventCreateInput, userId: number) {
  return await prisma.event.create({
    data: {
      name: payload.name,
      totalTickets: payload.totalTickets,
      availableTickets: payload.totalTickets,
      version: 0,
      userId,
    },
    select: {
      id: true,
      name: true,
      totalTickets: true,
      availableTickets: true,
      createdAt: true,
    },
  });
}

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      totalTickets: true,
      availableTickets: true,
      createdAt: true,
      userId: true,
    },
  });
}

export async function getEventById(id: number) {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) throw createHttpError(404, "Event not found");

  return event;
}
