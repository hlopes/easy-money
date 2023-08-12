/*
  Warnings:

  - Made the column `createdAt` on table `BankAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `BankAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
