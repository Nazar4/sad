import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.enableCors();
  app.enableShutdownHooks();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 8000);

  process.on('disconnect', closeServer);
  process.on('SIGTERM', closeServer);
  process.on('SIGINT', closeServer);

  function closeServer() {
    app.close().catch(() => process.exit(1));
  }
}

bootstrap();
