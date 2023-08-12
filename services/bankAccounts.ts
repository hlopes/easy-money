import { apiBaseUrl } from '@/config/vars';
import { BankAccount } from '@/app/api/bank-accounts/_types';

export async function getBankAccounts(): Promise<BankAccount[]> {
  const result = await fetch(`${apiBaseUrl}/bank-accounts`);

  return await result.json();
}
