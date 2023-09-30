'use server';

import { revalidatePath } from 'next/cache';
import { type Transaction, TransactionType } from '@prisma/client';

import type { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/prisma';

import { TRANSACTIONS_PATH } from './constants';
import { updateBankAccountBalance } from './helpers';

export default async function createTransaction(
  data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Transaction | ErrorResponse> {
  try {
    const { bankAccountId, categoryId, ...inputs } = data;

    const newTransaction = await prisma.transaction.create({
      data: {
        ...inputs,
        bankAccount: {
          connect: { id: bankAccountId },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        bankAccount: true,
        category: true,
      },
    });

    const amountToAdd =
      inputs?.type === TransactionType.INCOME
        ? +(inputs?.value ?? 0)
        : -(inputs?.value ?? 0);

    await updateBankAccountBalance(newTransaction, amountToAdd);

    revalidatePath(TRANSACTIONS_PATH);

    return newTransaction;
  } catch (error) {
    return { error: true };
  }
}
