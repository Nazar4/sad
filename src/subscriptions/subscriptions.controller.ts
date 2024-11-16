import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service.js';
import { Subscription } from './subscriptions.entity.js';

@Controller('subscriptions')
export class SubscriptionsController {
  private readonly logger = new Logger(SubscriptionsController.name);

  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  async findAll() {
    this.logger.log(`/subscriptions/ GET all`);
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    this.logger.log(`/subscriptions/${id} GET by id`);
    return this.subscriptionsService.findById(Number(id));
  }

  @Get('/users/:userId')
  async findSubscriptionsByUserId(@Param('userId') userId: string) {
    this.logger.log(`/subscriptions/users/${userId} GET by user id`);
    return this.subscriptionsService.findAllByUserId(Number(userId));
  }

  @Post()
  async create(@Body() subscriptionData: Subscription) {
    this.logger.log(`/subscriptions POST ${subscriptionData}`);
    return this.subscriptionsService.create(subscriptionData);
  }
}
