import { Module } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { TariffsController } from './tariffs.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TariffsService, PrismaService],
  controllers: [TariffsController],
  exports: [TariffsService],
})
export class TariffsModule {}
