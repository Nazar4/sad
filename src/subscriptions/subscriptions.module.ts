import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { TariffsModule } from '../tariffs/tariffs.module';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, PrismaService],
  imports: [UsersModule, TariffsModule],
})
export class SubscriptionsModule {}
