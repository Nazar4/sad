import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, PrismaService],
  exports: [AddressesService],
})
export class AddressesModule {}
