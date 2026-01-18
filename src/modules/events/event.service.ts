import { prisma } from "#/lib/db.js";
import { EventCreateInput } from "#/lib/prisma/generated/models.js";
import createHttpError from "http-errors";

// Simulate payment gateway taking 1 - 2s for processing
function simulatePaymentGateway() {
  return new Promise((resolve) => {
    const timeout = Math.floor(Math.random() * 1000) + 1000;
    setTimeout(resolve, timeout);
  });
}

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

export async function bookEvent(eventId: number, userId: number) {

  // Stock checking
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw createHttpError(404, "Event not found");
  }


  // the "bad" logic
  // check if stock exist, then wait for 2s
  // while the request is idle, other request might have already been completed
  if (event.availableTickets <= 0) {
    throw createHttpError(400, "No available seat");
  }

  console.log(`[userId: ${userId}] Processing payment...`);
  await simulatePaymentGateway();

  // update stock
  // this will (hopefully) still decrement even if the available ticket has already been 0
  const bookedEvent = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      availableTickets: {
        decrement: 1,
      },
    },
    select: {
      name: true,
      availableTickets: true,
      totalTickets: true,
    },
  });

  const ticket = await prisma.ticket.create({
    data: {
      eventId,
      userId,
    },
  });

  return { ticket, bookedEvent };
}
