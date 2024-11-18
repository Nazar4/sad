import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { AddressesModule } from '../addresses/address.module';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  imports: [AddressesModule],
  exports: [UsersService],
})
export class UsersModule {}
