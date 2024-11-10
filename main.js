'use strict';

const fastify = require('fastify')({
  logger: true,
});

// Register routes
fastify.register(require('./api/users'), { prefix: '/api/users' });
fastify.register(require('./api/tariffs'), { prefix: '/api/tariffs' });
fastify.register(require('./api/subscriptions'), {
  prefix: '/api/subscriptions',
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
