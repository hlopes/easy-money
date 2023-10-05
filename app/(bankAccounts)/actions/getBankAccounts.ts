import { prisma } from '@/lib/prisma';
import type { BankAccount } from '@/prisma/client';

export default function getBankAccounts(
  userId?: string
): Promise<BankAccount[]> {
  if (userId) {
    return prisma.bankAccount.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { userId },
    });
  }

  return prisma.bankAccount.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
