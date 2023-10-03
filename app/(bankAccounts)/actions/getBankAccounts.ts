import { prisma } from '@/lib/prisma';
import type { BankAccount } from '@/prisma/client';

export default function getBankAccounts(): Promise<BankAccount[]> {
  return prisma.bankAccount.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
