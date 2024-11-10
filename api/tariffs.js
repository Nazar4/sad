'use strict';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function(fastify, opts) {
  // Get all tariffs with their television options
  fastify.get('/', async (request, reply) => {
    const tariffs = await prisma.tariff.findMany({
      include: { televisionOption: true },
    });
    reply.send(tariffs);
  });

  // Get tariff by ID with its television option
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    const tariff = await prisma.tariff.findUnique({
      where: { id: parseInt(id) },
      include: { televisionOption: true },
    });
    if (!tariff) {
      return reply.status(404).send({ error: 'Tariff not found' });
    }
    reply.send(tariff);
  });

  // Create a new tariff
  fastify.post('/', async (request, reply) => {
    const {
      name,
      description,
      internetSpeed,
      dataLimit,
      price,
      televisionOptionId,
    } = request.body;
    const newTariff = await prisma.tariff.create({
      data: {
        name,
        description,
        internetSpeed,
        dataLimit,
        price,
        televisionOptionId,
      },
    });
    reply.status(201).send(newTariff);
  });
};
