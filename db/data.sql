INSERT INTO "Role" ("name") VALUES
('Manager'),
('User');

INSERT INTO "Address" ("streetName", "postalCode", "city", "country") VALUES
('str. Kavaleridze 25/16', '97011', 'Lviv', 'Ukraine'),
('str. Khreschatuk 10/4', '90011', 'Kyiv', 'Ukraine');

INSERT INTO "User" ("email", "password", "firstName", "lastName", "phone", "roleId", "addressId") VALUES
('manager@example.com', 'manager', 'John', 'Doe', '123456789', 1, 1),
('user@example.com', 'user', 'Jane', 'Smith', '987654321', 2, 2);

INSERT INTO "TelevisionOption" ("packageType", "description", "channels", "price") VALUES
('Basic', 'Basic TV package', 36, 10.00),
('Premium', 'Premium TV package with additional channels', 90, 20.00),
('Sports', 'Sports channels only', 20, 15.00);

INSERT INTO "Tariff" ("name", "description", "internetSpeed", "dataLimit", "staticIPAddress", "price", "televisionOptionId") VALUES
('Basic Plan', 'Basic internet plan with limited data', 50, 100, false, 25.00, 1),
('Unlimited Plan', 'Unlimited internet plan with moderate speed', 100, NULL, true, 45.00, 2),
('Premium Plan', 'High-speed internet with premium features', 200, NULL, true, 70.00, 3),
('Economy Plan', 'Economy internet plan with basic speed and no data cap', 25, NULL, false, 15.00, NULL),
('Family Plan', 'Family internet plan with fair price and decent speed and limit', 50, 300, false, 35.00, NULL);

INSERT INTO "Subscription" ("startDate", "endDate", "isActive", "price", "includeTelevision", "userId", "tariffId") VALUES
('2024-01-01', NULL, true, 65.00, true, 2, 2);