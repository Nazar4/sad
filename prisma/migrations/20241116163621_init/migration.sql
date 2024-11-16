/*
  Warnings:

  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channels` to the `TelevisionOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "includeTelevision" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Tariff" ADD COLUMN     "staticIPAddress" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TelevisionOption" ADD COLUMN     "channels" INTEGER NOT NULL;
