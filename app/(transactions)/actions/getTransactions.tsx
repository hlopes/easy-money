import { prisma } from '@/lib/prisma';
import type { PrismaPromise } from '@/prisma/client';

import type { TransactionWithCategory } from '../types';

export default function getTransactions(
  userId?: string
): PrismaPromise<TransactionWithCategory[]> {
  if (userId) {
    return prisma.transaction.findMany({
      include: {
        bankAccount: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: { userId },
    });
  }

  return prisma.transaction.findMany({
    include: {
      bankAccount: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
