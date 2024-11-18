import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from '../addresses.service';
import { PrismaService } from '../../prisma.service';

describe('AddressesService - createAddress', () => {
  let addressesService: AddressesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: PrismaService,
          useValue: {
            address: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    addressesService = module.get<AddressesService>(AddressesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('Should create address with a valid data', async () => {
    const mockAddress = {
      streetName: 'str. Shevchenka 12/13',
      city: 'Lviv',
      country: 'Ukraine',
      postalCode: '79011',
    } as any;

    const expectedResponse = { id: 1, ...mockAddress };

    jest
      .spyOn(prismaService.address, 'create')
      .mockResolvedValue(expectedResponse as any);

    const result = await addressesService.create(mockAddress);

    expect(prismaService.address.create).toHaveBeenCalledWith({
      data: {
        ...mockAddress,
      },
    });

    expect(result).toEqual(expectedResponse);
  });

  it('Should throw error when postal code is invalid', async () => {
    const mockAddress = {
      streetName: 'Shevchenka 12/13',
      city: 'Lviv',
      country: 'Ukraine',
      postalCode: '79011-1234',
    } as any;

    await expect(addressesService.create(mockAddress)).rejects.toThrow(
      'Address validation failed',
    );
  });
});
