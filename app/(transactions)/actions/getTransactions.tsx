import type { PrismaPromise } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import type { TransactionWithCategory } from '../types';

export default function getTransactions(): PrismaPromise<
  TransactionWithCategory[]
> {
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
