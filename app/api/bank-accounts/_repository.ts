import type { BankAccount, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

async function findBankAccountById(id: string) {
  return await prisma.bankAccount.findUnique({
    where: {
      id,
    },
  });
}

async function findBankAccount(criteria?: Partial<BankAccount>) {
  return await prisma.bankAccount.findMany({
    where: {
      ...(criteria ?? {}),
    },
  });
}

async function createBankAccount(bankAccount: Prisma.BankAccountCreateInput) {
  try {
    const newBankAccount = await prisma.bankAccount.create({
      data: {
        ...bankAccount,
      },
    });

    return newBankAccount;
  } catch (error) {
    throw error;
  }
}

async function updateBankAccount(
  id: string,
  updateWith: Prisma.BankAccountUpdateInput
) {
  try {
    const updatedBankAccount = await prisma.bankAccount.update({
      where: { id },
      data: { ...updateWith },
    });

    return updatedBankAccount;
  } catch (error) {
    throw error;
  }
}

async function deleteBankAccount(id: string) {
  return await prisma.bankAccount.delete({
    where: { id },
  });
}

export {
  createBankAccount,
  deleteBankAccount,
  findBankAccount,
  findBankAccountById,
  updateBankAccount,
};
