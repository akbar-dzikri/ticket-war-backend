import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";
  let details = undefined;

  reply.status(statusCode).send({
    success: false,
    error: {
      code: statusCode,
      message: message,
      details: details,
    },
  });
}
