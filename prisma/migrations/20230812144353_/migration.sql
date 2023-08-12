/*
  Warnings:

  - You are about to alter the column `initialValue` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "initialValue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
