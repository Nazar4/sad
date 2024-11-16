import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddressesService } from './addresses.service.js';
import { Address } from '@prisma/client';

@Controller('addresses')
export class AddressesController {
  private readonly logger = new Logger(AddressesController.name);

  constructor(private readonly addressesService: AddressesService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    this.logger.log(`/addresses/${id} GET by id`);
    return this.addressesService.findById(Number(id));
  }

  @Post()
  async create(@Body() data: Address) {
    this.logger.log(`/addresses POST ${data.streetName}`);
    return this.addressesService.create(data);
  }

  @Put()
  async update(@Body() data: Address) {
    this.logger.log(`/addresses PUT ${data.streetName}`);
    return this.addressesService.update(data);
  }
}
