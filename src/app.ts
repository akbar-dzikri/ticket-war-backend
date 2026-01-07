import Fastify from 'fastify';
import dotenv from 'dotenv';
import { prisma } from './lib/db.js';

dotenv.config();

const app = Fastify({
  logger: true
});

app.get('/', async (request, reply) => {
  return { hello: 'world', mode: 'ESM' };
});

app.get('/test-db', async () => {
  const users = await prisma.user.findMany();
  return { status: 'ok', users };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();