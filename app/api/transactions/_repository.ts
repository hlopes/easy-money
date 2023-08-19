import type { Prisma, Transaction } from '@prisma/client';

import { prisma } from '@/lib/prisma';

async function findTransactionById(id: string) {
  return await prisma.transaction.findUnique({
    where: {
      id,
    },
  });
}

async function findTransactions(criteria?: Partial<Transaction>) {
  return await prisma.transaction.findMany({
    where: {
      ...(criteria ?? {}),
    },
  });
}

async function createTransaction(
  transaction: Omit<Prisma.TransactionCreateInput, 'bankAccount'> & {
    bankAccountId: string;
  }
) {
  const { date, value, notes } = transaction;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        date,
        value,
        notes,
        bankAccount: {
          connect: { id: transaction.bankAccountId },
        },
      },
      include: {
        bankAccount: true,
      },
    });

    return newTransaction;
  } catch (error) {
    throw error;
  }
}

async function updateTransaction(
  id: string,
  updateWith: Prisma.TransactionUpdateInput
) {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: { ...updateWith },
    });

    return updatedTransaction;
  } catch (error) {
    throw error;
  }
}

async function deleteTransaction(id: string) {
  return await prisma.transaction.delete({
    where: { id },
  });
}

export {
  createTransaction,
  deleteTransaction,
  findTransactionById,
  findTransactions,
  updateTransaction,
};
