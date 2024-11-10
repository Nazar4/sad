'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(fastify, opts) {
  // Get subscription by ID with user and tariff details
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, tariff: true },
    });
    if (!subscription) {
      return reply.status(404).send({ error: 'Subscription not found' });
    }
    reply.send(subscription);
  });

  // Get subscriptions by user ID with user and tariff details
  fastify.get('/user/:userId', async (request, reply) => {
    const { userId } = request.params;
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: parseInt(userId) },
      include: { user: true, tariff: true },
    });
    reply.send(subscriptions);
  });

  // Create a new subscription with isActive set to false
  fastify.post('/', async (request, reply) => {
    const { startDate, userId, tariffId } = request.body;
    const newSubscription = await prisma.subscription.create({
      data: { startDate, isActive: false, userId, tariffId },
    });
    reply.status(201).send(newSubscription);
  });
};
