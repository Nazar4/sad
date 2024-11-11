import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Tariff } from './tariffs.entity.js';

@Injectable()
export class TariffsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tariff.findMany({
      include: { televisionOption: true },
    });
  }

  async findById(id: number) {
    return this.prisma.tariff.findUnique({
      where: { id },
      include: { televisionOption: true },
    });
  }

  async create(tariff: Tariff) {
    const { name, description = '', internetSpeed, dataLimit, price } = tariff;
    if (Number(price) < 0) {
      throw new Error('Negative price is not allowed');
    }
    if (Number(internetSpeed) < 0 || Number(internetSpeed) > 1000) {
      throw new Error('Incorrect value for internetSpeed');
    }
    if (Number(dataLimit) > 1024) {
      throw new Error('Incorrect value for dataLimit');
    }
    return this.prisma.tariff.create({
      data: {
        name,
        description,
        internetSpeed,
        dataLimit,
        price,
        televisionOptionId: tariff.televisionOption.id,
      },
    });
  }
}
