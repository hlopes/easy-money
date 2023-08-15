/*
  Warnings:

  - Added the required column `date` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
