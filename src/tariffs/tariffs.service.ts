import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tariff } from './tariffs.entity';

@Injectable()
export class TariffsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllTariffs() {
    const result = await this.prisma.tariff.findMany({
      include: { televisionOption: true },
    });

    return result.map((item) => {
      if (item.televisionOption) {
        return {
          ...item,
          price: item.price.toNumber(),
          televisionOption: {
            ...item.televisionOption,
            price: item.televisionOption.price.toNumber(),
          },
        };
      }
      return { ...item, price: item.price.toNumber() };
    });
  }

  async findTariffById(id: number) {
    const tariff = await this.prisma.tariff.findUnique({
      where: { id },
      include: { televisionOption: true },
    });

    if (tariff.televisionOption) {
      return {
        ...tariff,
        price: tariff.price.toNumber(),
        televisionOption: {
          ...tariff.televisionOption,
          price: tariff.televisionOption.price.toNumber(),
        },
      };
    }

    return { ...tariff, price: tariff.price.toNumber() };
  }

  async createTariff(tariff: Tariff) {
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
        televisionOptionId: tariff.televisionOption?.id || null,
      },
    });
  }
}
