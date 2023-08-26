import type { Prisma, Transaction } from '@prisma/client';

import { prisma } from '@/lib/prisma';

async function updateBankAccountBalance(
  transaction: Transaction,
  amount: number
) {
  const bankAccount = await prisma.bankAccount.findUnique({
    where: {
      id: transaction?.bankAccountId,
    },
  });

  if (!bankAccount) {
    throw new Error('Could not find bank account');
  }

  await prisma.bankAccount.update({
    where: { id: transaction?.bankAccountId },
    data: { balance: bankAccount.balance + amount },
  });
}

async function findTransactionById(id: string) {
  return await prisma.transaction.findUnique({
    where: {
      id,
    },
  });
}

async function findTransactions(criteria?: Transaction) {
  return await prisma.transaction.findMany({
    where: {
      ...(criteria ?? {}),
    },
    include: {
      bankAccount: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
}

async function createTransaction(
  transaction: Omit<Prisma.TransactionCreateInput, 'bankAccount'> & {
    bankAccountId: string;
  }
) {
  const { date, value, notes, type } = transaction;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        date,
        value,
        notes,
        type,
        bankAccount: {
          connect: { id: transaction.bankAccountId },
        },
      },
      include: {
        bankAccount: true,
      },
    });

    const amountToAdd =
      transaction?.type === 'income'
        ? +(transaction?.value ?? 0)
        : -(transaction?.value ?? 0);

    await updateBankAccountBalance(newTransaction, amountToAdd);

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
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new Error('Could not find transaction');
    }

    const amountToRemove =
      transaction?.type === 'income'
        ? -transaction?.value
        : +(transaction?.value ?? 0);

    await updateBankAccountBalance(transaction, amountToRemove);

    const amountToAdd =
      updateWith?.type === 'income'
        ? +(updateWith?.value ?? 0)
        : -(updateWith?.value ?? 0);

    await updateBankAccountBalance(transaction, amountToAdd);

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
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new Error('Could not find transaction');
    }

    const newAmount =
      transaction?.type === 'income'
        ? -transaction?.value
        : +(transaction?.value ?? 0);

    await updateBankAccountBalance(transaction, newAmount);

    return await prisma.transaction.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
}

export {
  createTransaction,
  deleteTransaction,
  findTransactionById,
  findTransactions,
  updateTransaction,
};
