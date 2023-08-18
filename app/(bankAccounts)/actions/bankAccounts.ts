'use server';

import { revalidateTag } from 'next/cache';
import type { BankAccount, Prisma } from '@prisma/client';

import { apiBaseUrl } from '@/config/vars';

async function getBankAccounts(): Promise<BankAccount[]> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts`, {
    cache: 'no-cache',
    next: { tags: ['bankAccounts'] },
  });

  return await result.json();
}

async function createBankAccount(
  bankAccount: Prisma.BankAccountCreateInput
): Promise<BankAccount> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts`, {
    method: 'post',
    body: JSON.stringify(bankAccount),
  });

  revalidateTag('bankAccounts');

  return await result.json();
}

async function updateBankAccount(
  bankAccount: Prisma.BankAccountUpdateInput
): Promise<BankAccount> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts/${bankAccount.id}`, {
    method: 'put',
    body: JSON.stringify(bankAccount),
  });

  revalidateTag('bankAccounts');

  return await result.json();
}

async function deleteBankAccount(bankAccountId: string): Promise<void> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts/${bankAccountId}`, {
    method: 'delete',
  });

  revalidateTag('bankAccounts');

  return await result.json();
}

export {
  createBankAccount,
  deleteBankAccount,
  getBankAccounts,
  updateBankAccount,
};
