import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from '../prisma.service.js';
import { UsersModule } from '../users/users.module.js';
import { TariffsModule } from '../tariffs/tariffs.module.js';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService],
  imports: [UsersModule, TariffsModule],
})
export class SubscriptionsModule {}
