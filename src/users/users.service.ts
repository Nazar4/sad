import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { AddressesService } from '../addresses/addresses.service.js';
import { User } from './users.entity.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly addressesService: AddressesService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { role: true, address: true },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true, address: true },
    });
  }

  async create(user: User) {
    try {
      const { email, password, firstName, lastName, phone, address } = user;
      const newAddress = await this.addressesService.create(address);
      const { id: roleId } = await this.prisma.role.findFirst({
        where: { name: 'User' },
      });
      return this.prisma.user.create({
        data: {
          email,
          password,
          firstName,
          lastName,
          phone,
          addressId: newAddress.id,
          roleId: roleId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async update(user: User) {
    const { id, email, password, firstName, lastName, phone } = user;
    // await this.addressesService.update(address);
    return this.prisma.user.update({
      where: { id },
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
      },
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = this.prisma.user.findUnique({
      where: { email: email, password: password },
      include: { role: true, address: true },
    });
    return !!user;
  }
}
