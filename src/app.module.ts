import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { AddressesModule } from './addresses/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    TariffsModule,
    SubscriptionsModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
