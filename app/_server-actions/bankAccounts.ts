'use server';

import { apiBaseUrl } from '@/config/vars';
import { BankAccount, Prisma } from '@prisma/client';

export async function getBankAccounts(): Promise<BankAccount[]> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts`, {
    cache: 'no-cache',
  });

  return await result.json();
}

export async function deleteBankAccount(bankAccountId: string): Promise<void> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts/${bankAccountId}`, {
    method: 'delete',
  });

  return await result.json();
}

export async function createBankAccount(
  bankAccount: Prisma.BankAccountCreateInput
): Promise<BankAccount> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts`, {
    method: 'post',
    body: JSON.stringify(bankAccount),
  });

  return await result.json();
}
