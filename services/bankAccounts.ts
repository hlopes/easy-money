import { apiBaseUrl } from '@/config/vars';
import { BankAccount } from '@prisma/client';

export async function getBankAccounts(): Promise<BankAccount[]> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts`, {
    cache: 'no-cache',
  });

  return await result.json();
}
