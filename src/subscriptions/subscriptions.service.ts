import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Subscription } from './subscriptions.entity.js';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subscription.findMany({
      include: { tariff: true, user: true },
    });
  }

  async findById(id: number) {
    return this.prisma.subscription.findUnique({
      where: { id },
      include: { tariff: true, user: true },
    });
  }

  async findAllByUserId(userId: number) {
    return this.prisma.subscription.findMany({
      where: { userId },
      include: {
        tariff: true,
        user: true,
      },
    });
  }

  async create(subscription: Subscription) {
    const { startDate = new Date(), endDate, isActive = false } = subscription;
    if (new Date(startDate).getMilliseconds() < Date.now()) {
      throw new Error('Start date is invalid');
    }
    if (endDate && !this.isEndDateAfterStartDate(startDate, endDate)) {
      throw new Error('Start date is after End date');
    }
    return this.prisma.subscription.create({
      data: {
        startDate,
        endDate,
        isActive,
        userId: subscription.user?.id,
        tariffId: subscription.tariff?.id,
      },
    });
  }

  private isEndDateAfterStartDate(startDate: Date, endDate: Date): boolean {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      throw new TypeError('Invalid date objects');
    }
    const timeDifference = endDate.getTime() - startDate.getTime();

    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

    return timeDifference >= oneMonthInMilliseconds;
  }
}
