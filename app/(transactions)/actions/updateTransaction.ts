'use server';

import { revalidatePath } from 'next/cache';
import type { Transaction } from '@prisma/client';
import { TransactionType } from '@prisma/client';

import type { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/prisma';

import { TRANSACTIONS_PATH } from './constants';
import { updateBankAccountBalance } from './helpers';

export default async function updateBankAccount(
  data: Omit<Transaction, 'createdAt' | 'updatedAt'>
): Promise<Transaction | ErrorResponse> {
  try {
    const { bankAccountId, ...inputs } = data;

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: inputs.id,
      },
    });

    if (!transaction) {
      throw new Error('Could not find the transaction');
    }

    const amountToRemove =
      transaction?.type === TransactionType.INCOME
        ? -transaction?.value
        : +(transaction?.value ?? 0);

    await updateBankAccountBalance(transaction, amountToRemove);

    const amountToAdd =
      inputs?.type === TransactionType.INCOME
        ? +(inputs?.value ?? 0)
        : -(inputs?.value ?? 0);

    await updateBankAccountBalance(transaction, amountToAdd);

    const updatedTransaction = await prisma.transaction.update({
      where: { id: inputs.id },
      data: { ...inputs },
    });

    revalidatePath(TRANSACTIONS_PATH);

    return updatedTransaction;
  } catch (error) {
    return { error: true };
  }
}
