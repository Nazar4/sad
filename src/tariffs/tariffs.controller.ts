import { Body, ClassSerializerInterceptor, Controller, Get, Logger, Param, Post, UseInterceptors } from '@nestjs/common';
import { TariffsService } from './tariffs.service.js';
import { Tariff } from './tariffs.entity.js';

@Controller('tariffs')
@UseInterceptors(ClassSerializerInterceptor)
export class TariffsController {
  private readonly logger = new Logger(TariffsController.name);

  constructor(private readonly tariffsService: TariffsService) {}

  @Get()
  async findAll() {
    this.logger.log(`/tariffs/ GET all`);
    return this.tariffsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    this.logger.log(`/tariffs/${id} GET by id`);
    return this.tariffsService.findById(Number(id));
  }

  @Post()
  async create(@Body() tariffData: Tariff) {
    this.logger.log(`/tariffs POST ${tariffData}`);
    return this.tariffsService.create(tariffData);
  }
}
