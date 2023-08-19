'use server';

import { revalidateTag } from 'next/cache';
import type { Prisma, Transaction } from '@prisma/client';

import { apiBaseUrl } from '@/config/vars';

async function getTransactions(): Promise<Transaction[]> {
  const result = await fetch(`${apiBaseUrl}/transactions`, {
    cache: 'no-cache',
    next: { tags: ['transactions'] },
  });

  return await result.json();
}

async function createTransaction(
  transaction: Omit<Prisma.TransactionCreateInput, 'bankAccount'> & {
    bankAccountId: string;
  }
): Promise<Transaction> {
  const result = await fetch(`${apiBaseUrl}/transactions`, {
    method: 'post',
    body: JSON.stringify(transaction),
  });

  revalidateTag('transactions');

  return await result.json();
}

async function updateTransaction(
  transaction: Prisma.TransactionUpdateInput
): Promise<Transaction> {
  const result = await fetch(`${apiBaseUrl}/transactions/${transaction.id}`, {
    method: 'put',
    body: JSON.stringify(transaction),
  });

  revalidateTag('transactions');

  return await result.json();
}

async function deleteTransaction(transactionId: string): Promise<void> {
  const result = await fetch(`${apiBaseUrl}/transactions/${transactionId}`, {
    method: 'delete',
  });

  revalidateTag('transactions');

  return await result.json();
}

export {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
};
