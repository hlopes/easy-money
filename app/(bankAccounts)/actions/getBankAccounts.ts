import type { BankAccount } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export default function getBankAccounts(): Promise<BankAccount[]> {
  return prisma.bankAccount.findMany();
}
