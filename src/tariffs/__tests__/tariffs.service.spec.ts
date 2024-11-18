import { Test, TestingModule } from '@nestjs/testing';
import { TariffsService } from '../tariffs.service';
import { PrismaService } from '../../prisma.service';

describe('TariffsService - createTariff', () => {
  let tariffsService: TariffsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TariffsService,
        {
          provide: PrismaService,
          useValue: {
            tariff: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    tariffsService = module.get<TariffsService>(TariffsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should create tariff with a valid data', async () => {
    const mockTariff = {
      name: 'Test Tariff',
      description: 'Test description',
      internetSpeed: 100,
      dataLimit: 500,
      price: 49.99,
    } as any;

    const expectedResponse = { id: 1, ...mockTariff, televisionOptionId: null };

    jest
      .spyOn(prismaService.tariff, 'create')
      .mockResolvedValue(expectedResponse as any);

    const result = await tariffsService.createTariff(mockTariff);

    expect(prismaService.tariff.create).toHaveBeenCalledWith({
      data: {
        ...mockTariff,
        televisionOptionId: null,
      },
    });

    expect(result).toEqual(expectedResponse);
  });

  it('Should throw error when price is negative', async () => {
    const mockTariff = {
      name: 'Test Tariff',
      description: 'Test description',
      internetSpeed: 100,
      dataLimit: 500,
      price: -10,
    } as any;

    await expect(tariffsService.createTariff(mockTariff)).rejects.toThrow(
      'Negative price is not allowed',
    );
  });

  it('Should throw an error when internetSpeed is out of bounds', async () => {
    const mockTariff = {
      name: 'Test Tariff',
      description: 'Test description',
      internetSpeed: 1500,
      dataLimit: 500,
      price: 49.99,
    } as any;

    await expect(tariffsService.createTariff(mockTariff)).rejects.toThrow(
      'Incorrect value for internetSpeed',
    );
  });

  it('Should throw an error when dataLimit exceeds 1024', async () => {
    const mockTariff = {
      name: 'Test Tariff',
      description: 'Test description',
      internetSpeed: 100,
      dataLimit: 1500,
      price: 49.99,
    } as any;

    await expect(tariffsService.createTariff(mockTariff)).rejects.toThrow(
      'Incorrect value for dataLimit',
    );
  });
});
