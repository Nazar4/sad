import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Logger,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    this.logger.log(`/users/ GET all`);
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    this.logger.log(`/users/${id} GET by id`);
    return this.usersService.findById(Number(id));
  }

  @Post()
  async registerUser(@Body() userData: User) {
    this.logger.log(`/users POST ${userData}`);
    return this.usersService.create(userData);
  }

  @Put()
  async updateUser(@Body() userData: User) {
    this.logger.log(`/users PUT ${userData.id}`);
    return this.usersService.update(userData);
  }

  @Post('/login')
  async loginUser(@Body() { email, password }) {
    this.logger.log(`/users POST ${email}`);
    return this.usersService.login(email, password);
  }
}
