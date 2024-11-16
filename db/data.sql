INSERT INTO "Role" ("id", "name") VALUES
(1, 'Manager'),
(2, 'User');

INSERT INTO "Address" ("id", "streetName", "postalCode", "city", "country") VALUES
(1, 'str. Kavaleridze 25/16', '97011', 'Lviv', 'Ukraine'),
(2, 'str. Khreschatuk 10/4', '90011', 'Kyiv', 'Ukraine');

INSERT INTO "User" ("id", "email", "password", "firstName", "lastName", "phone", "roleId", "addressId") VALUES
(1, 'manager@example.com', 'manager', 'John', 'Doe', '123456789', 1, 1),
(2, 'user@example.com', 'user', 'Jane', 'Smith', '987654321', 2, 2);

INSERT INTO "TelevisionOption" ("id", "packageType", "description", "price") VALUES
(1, 'Basic', 'Basic TV package', 10.00),
(2, 'Premium', 'Premium TV package with additional channels', 20.00),
(3, 'Sports', 'Sports channels only', 15.00);

INSERT INTO "Tariff" ("id", "name", "description", "internetSpeed", "dataLimit", "price", "televisionOptionId") VALUES
(1, 'Basic Plan', 'Basic internet plan with limited data', 50, 100, 25.00, 1),
(2, 'Unlimited Plan', 'Unlimited internet plan with moderate speed', 100, NULL, 45.00, 2),
(3, 'Premium Plan', 'High-speed internet with premium features', 200, NULL, 70.00, 3),
(4, 'Economy Plan', 'Economy internet plan with basic speed and no data cap', 25, NULL, 15.00, NULL),
(5, 'Family Plan', 'Family internet plan with fair price and decent speed and limit', 50, 300, 35.00, NULL);

INSERT INTO "Subscription" ("id", "startDate", "endDate", "isActive", "userId", "tariffId") VALUES
(1, '2024-01-01', NULL, true, 2, 2);