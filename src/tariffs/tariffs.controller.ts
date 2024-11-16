import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TariffsService } from './tariffs.service.js';
import { Tariff } from './tariffs.entity.js';

@Controller('tariffs')
@UseInterceptors(ClassSerializerInterceptor)
export class TariffsController {
  private readonly logger = new Logger(TariffsController.name);

  constructor(private readonly tariffsService: TariffsService) {}

  @Get()
  async findAllTariffs() {
    this.logger.log(`/tariffs/ GET all`);
    return this.tariffsService.findAllTariffs();
  }

  @Get(':id')
  async findTariffById(@Param('id') id: string) {
    this.logger.log(`/tariffs/${id} GET by id`);
    return this.tariffsService.findTariffById(Number(id));
  }

  @Post()
  async createTariff(@Body() tariffData: Tariff, adminId: string) {
    this.logger.log(`/tariffs POST ${adminId}`);
    return this.tariffsService.createTariff(tariffData);
  }
}
