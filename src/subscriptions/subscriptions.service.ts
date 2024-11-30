import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubscription } from './subscriptions-create.entity';
import { UsersService } from '../users/users.service';
import { TariffsService } from '../tariffs/tariffs.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly tariffService: TariffsService,
  ) {}

  async findAll() {
    const subs = await this.prisma.subscription.findMany({
      include: { tariff: true, user: true },
    });

    return subs.map((sub) => ({ ...sub, price: sub.price.toNumber() }));
  }

  async findById(id: number) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
      include: {
        tariff: {
          include: {
            televisionOption: true,
          },
        },
        user: true,
      },
    });

    return { ...sub, price: sub.price.toNumber() };
  }

  async findAllByUserId(userId: number) {
    const subs = await this.prisma.subscription.findMany({
      where: { userId },
      include: {
        tariff: {
          include: {
            televisionOption: true,
          },
        },
        user: true,
      },
    });

    return subs.map((sub) => {
      if (!sub.includeTelevision) {
        delete sub.tariff.televisionOption;
      }
      return { ...sub, price: sub.price.toNumber() };
    });
  }

  async create({
    startDate = new Date(),
    endDate,
    includeTelevision = false,
    isActive = false,
    tariffId,
    userId,
  }: CreateSubscription) {
    try {
      const user = await this.usersService.findById(userId);
      const tariff = await this.tariffService.findTariffById(tariffId);

      startDate = new Date(startDate);
      endDate = endDate ? new Date(endDate) : null;

      if (new Date(startDate).getTime() < new Date().getTime()) {
        throw new Error('Start date is invalid');
      }
      if (endDate && !this.isEndDateAfterStartDate(startDate, endDate)) {
        throw new Error('Start date is after End date');
      }
      let price = Number(tariff.price);
      if (includeTelevision) {
        price += Number(tariff.televisionOption.price);
      }
      return this.prisma.subscription.create({
        data: {
          startDate,
          endDate,
          isActive,
          price,
          includeTelevision,
          userId: user.id,
          tariffId: tariff.id,
        },
      });
    } catch (error) {
      // console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async stopSubscription(subscriptionId: number) {
    try {
      return this.prisma.subscription.update({
        where: { id: subscriptionId },
        data: { endDate: new Date(), isActive: false },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
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
