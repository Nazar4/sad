import { Injectable } from '@nestjs/common';
import { User } from './users.entity.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { role: true },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async create(user: User) {
    const { email, password, firstName, lastName, phone, address } = user;
    return this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        phone,
        address,
        roleId: user.role.id,
      },
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = this.prisma.user.findUnique({
        where: { email: email, password: password },
        include: { role: true }
    });
    return !!user;
  }
}
