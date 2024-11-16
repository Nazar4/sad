import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Address } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.address.findUnique({
      where: { id },
    });
  }

  async create(address: Address) {
    const { streetName, city, country, postalCode } = address;
    if (postalCode.length !== 5 || !streetName || !city || !country)
      throw new BadRequestException('Address validation failed');
    return this.prisma.address.create({
      data: {
        streetName,
        city,
        country,
        postalCode,
      },
    });
  }

  async update(address: Address) {
    const { streetName, city, country, postalCode, id } = address;
    const exists = await this.prisma.address.findUnique({
      where: { id },
    });
    if (!exists) {
      throw new BadRequestException(`Could not find address with id: [${id}]`);
    }
    if (postalCode.length !== 5 || !streetName || !city || !country)
      throw new BadRequestException('Address validation failed');
    return this.prisma.address.update({
      where: { id },
      data: {
        streetName,
        city,
        country,
        postalCode,
      },
    });
  }
}
