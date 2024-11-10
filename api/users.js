'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(fastify, opts) {
  // Get all users with their roles
  fastify.get('/', async (request, reply) => {
    const users = await prisma.user.findMany({
      include: { role: true },
    });
    reply.send(users);
  });

  // Get user by ID with their role
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { role: true },
    });
    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }
    reply.send(user);
  });

  // Create a new user
  fastify.post('/', async (request, reply) => {
    const { email, password, firstName, lastName, phone, address, roleId } =
      request.body;
    const newUser = await prisma.user.create({
      data: { email, password, firstName, lastName, phone, address, roleId },
    });
    reply.status(201).send(newUser);
  });
};
