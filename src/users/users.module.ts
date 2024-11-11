import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service.js';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  imports: []
})
export class UsersModule {}
