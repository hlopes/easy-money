'use server';

import { revalidatePath } from 'next/cache';
import type { Transaction } from '@prisma/client';
import { TransactionType } from '@prisma/client';

import type { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/prisma';

import { TRANSACTIONS_PATH } from './constants';
import { updateBankAccountBalance } from './helpers';

export default async function deleteTransaction(
  id: string
): Promise<Transaction | ErrorResponse> {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
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

    const deleteTransaction = await prisma.transaction.delete({
      where: { id },
    });

    revalidatePath(TRANSACTIONS_PATH);

    return deleteTransaction;
  } catch (error) {
    return { error: true };
  }
}
