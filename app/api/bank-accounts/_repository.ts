import { BankAccount, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function findBankAccountById(id: string) {
  return await prisma.bankAccount.findUnique({
    where: {
      id,
    },
  });
}

export async function findBankAccount(criteria?: Partial<BankAccount>) {
  return await prisma.bankAccount.findMany({
    where: {
      ...(criteria ?? {}),
    },
  });
}

export async function createBankAccount(
  bankAccount: Prisma.BankAccountCreateInput
) {
  try {
    const newBankAccount = await prisma.bankAccount.create({
      data: {
        ...bankAccount,
      },
    });

    return newBankAccount;
  } catch (error) {
    console.error('Error updating bank account:', error);

    throw error;
  }
}

export async function updateBankAccount(
  id: string,
  updateWith: Prisma.BankAccountUpdateInput
) {
  try {
    const updatedUser = await prisma.bankAccount.update({
      where: { id },
      data: { ...updateWith },
    });

    return updatedUser;
  } catch (error) {
    console.error('Error updating bank account:', error);

    throw error;
  }
}

export async function deleteBankAccount(id: string) {
  return await prisma.bankAccount.delete({
    where: { id },
  });
}
