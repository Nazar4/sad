import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { TariffsService } from '../../tariffs/tariffs.service';
import { UsersService } from '../../users/users.service';
import { SubscriptionsService } from '../subscriptions.service';
import { CreateSubscription } from '../subscriptions-create.entity';

describe('SubscriptionsService - createSubscription', () => {
  let tariffsService: TariffsService;
  let usersService: UsersService;
  let prismaService: PrismaService;
  let subscriptionsService: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: PrismaService,
          useValue: {
            subscription: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: TariffsService,
          useValue: {
            findTariffById: jest.fn(),
          },
        },
      ],
    }).compile();

    subscriptionsService =
      module.get<SubscriptionsService>(SubscriptionsService);
    prismaService = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    tariffsService = module.get<TariffsService>(TariffsService);
  });

  it('Should create a subscription without television', async () => {
    const user = { id: 1 };
    const tariff = { id: 2, price: 50 };
    const mockSubscription: CreateSubscription = {
      startDate: new Date(Date.now()),
      includeTelevision: false,
      isActive: true,
      userId: user.id,
      tariffId: tariff.id,
    };

    const expectedResponse = {
      id: 1,
      ...mockSubscription,
      price: tariff.price,
    };

    jest.spyOn(usersService, 'findById').mockResolvedValue(user as any);
    jest
      .spyOn(tariffsService, 'findTariffById')
      .mockResolvedValue(tariff as any);
    jest
      .spyOn(prismaService.subscription, 'create')
      .mockResolvedValue(expectedResponse as any);

    const result = await subscriptionsService.create(mockSubscription);

    expect(usersService.findById).toHaveBeenCalledWith(user.id);
    expect(tariffsService.findTariffById).toHaveBeenCalledWith(tariff.id);
    expect(prismaService.subscription.create).toHaveBeenCalledWith({
      data: {
        startDate: mockSubscription.startDate,
        endDate: undefined,
        isActive: mockSubscription.isActive,
        price: tariff.price,
        includeTelevision: mockSubscription.includeTelevision,
        userId: user.id,
        tariffId: tariff.id,
      },
    });

    expect(result).toEqual(expectedResponse);
  });

  it('Should create a subscription with television option', async () => {
    const tariff = { id: 1, price: 50, televisionOption: { price: 20 } };
    const mockSubscription: CreateSubscription = {
      startDate: new Date(Date.now()),
      includeTelevision: true,
      isActive: false,
      userId: 1,
      tariffId: tariff.id,
    };

    const expectedResponse = {
      id: 1,
      ...mockSubscription,
      price: Number(tariff.price + tariff.televisionOption.price),
    };

    jest.spyOn(usersService, 'findById').mockResolvedValue({ id: 1 } as any);
    jest
      .spyOn(tariffsService, 'findTariffById')
      .mockResolvedValue(tariff as any);
    jest
      .spyOn(prismaService.subscription, 'create')
      .mockResolvedValue(expectedResponse as any);

    const result = await subscriptionsService.create(mockSubscription);

    expect(tariffsService.findTariffById).toHaveBeenCalledWith(tariff.id);
    expect(prismaService.subscription.create).toHaveBeenCalledWith({
      data: {
        startDate: mockSubscription.startDate,
        endDate: undefined,
        isActive: mockSubscription.isActive,
        price: Number(tariff.price + tariff.televisionOption.price),
        includeTelevision: mockSubscription.includeTelevision,
        userId: 1,
        tariffId: tariff.id,
      },
    });

    expect(result).toEqual(expectedResponse);
  });

  it('Should throw an error if startDate is invalid', async () => {
    const mockSubscription: CreateSubscription = {
      startDate: new Date('2023-12-01'),
      includeTelevision: false,
      isActive: true,
      userId: 1,
      tariffId: 2,
    };

    await expect(subscriptionsService.create(mockSubscription)).rejects.toThrow(
      'Start date is invalid',
    );
  });

  it('should throw an error if startDate is after endDate', async () => {
    const mockSubscription: CreateSubscription = {
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-11-01'),
      includeTelevision: false,
      isActive: true,
      userId: 1,
      tariffId: 2,
    };

    await expect(subscriptionsService.create(mockSubscription)).rejects.toThrow(
      'Start date is after End date',
    );
  });
});
