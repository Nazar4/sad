'use strict';

// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Insert roles
    await prisma.role.createMany({
      data: [{ name: 'Manager' }, { name: 'User' }],
    });

    // Insert addresses
    await prisma.address.createMany({
      data: [
        {
          streetName: 'str. Kavaleridze 25/16',
          postalCode: '97011',
          city: 'Lviv',
          country: 'Ukraine',
        },
        {
          streetName: 'str. Khreschatuk 10/4',
          postalCode: '90011',
          city: 'Kyiv',
          country: 'Ukraine',
        },
      ],
    });

    // Insert users
    await prisma.user.createMany({
      data: [
        {
          email: 'manager@example.com',
          password: 'manager',
          firstName: 'John',
          lastName: 'Doe',
          phone: '123456789',
          roleId: 1,
          addressId: 1,
        },
        {
          email: 'user@example.com',
          password: 'user',
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '987654321',
          roleId: 2,
          addressId: 2,
        },
      ],
    });

    // Insert television options
    await prisma.televisionOption.createMany({
      data: [
        {
          packageType: 'Basic',
          description: 'Basic TV package',
          channels: 36,
          price: 10.0,
        },
        {
          packageType: 'Premium',
          description: 'Premium TV package with additional channels',
          channels: 90,
          price: 20.0,
        },
        {
          packageType: 'Sports',
          description: 'Sports channels only',
          channels: 20,
          price: 15.0,
        },
      ],
    });

    // Insert tariffs
    await prisma.tariff.createMany({
      data: [
        {
          name: 'Basic Plan',
          description: 'Basic internet plan with limited data',
          internetSpeed: 50,
          dataLimit: 100,
          staticIPAddress: false,
          price: 25.0,
          televisionOptionId: 1,
        },
        {
          name: 'Unlimited Plan',
          description: 'Unlimited internet plan with moderate speed',
          internetSpeed: 100,
          dataLimit: null,
          staticIPAddress: true,
          price: 45.0,
          televisionOptionId: 2,
        },
        {
          name: 'Premium Plan',
          description: 'High-speed internet with premium features',
          internetSpeed: 200,
          dataLimit: null,
          staticIPAddress: true,
          price: 70.0,
          televisionOptionId: 3,
        },
        {
          name: 'Economy Plan',
          description: 'Economy internet plan with basic speed and no data cap',
          internetSpeed: 25,
          dataLimit: null,
          staticIPAddress: false,
          price: 15.0,
          televisionOptionId: null,
        },
        {
          name: 'Family Plan',
          description:
            'Family internet plan with fair price and decent speed and limit',
          internetSpeed: 50,
          dataLimit: 300,
          staticIPAddress: false,
          price: 35.0,
          televisionOptionId: null,
        },
      ],
    });

    // Insert subscriptions
    await prisma.subscription.createMany({
      data: [
        {
          startDate: new Date('2024-01-01'),
          endDate: null,
          isActive: true,
          price: 65.0,
          includeTelevision: true,
          userId: 2,
          tariffId: 2,
        },
        {
          startDate: new Date('2023-05-07'),
          endDate: new Date('2023-12-30'),
          isActive: false,
          price: 20.0,
          includeTelevision: true,
          userId: 2,
          tariffId: 1,
        },
      ],
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the seed function

(async () => {
  console.log('Setting up environment');
  await seedDatabase();

  console.log('Environment is ready');
})().catch((err) => {
  console.error(err);
});
