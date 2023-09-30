import type { PrismaPromise } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import type { TransactionWithCategories } from '../types';

export default function getTransactions(): PrismaPromise<
  TransactionWithCategories[]
> {
  return prisma.transaction.findMany({
    include: {
      bankAccount: true,
      category: true,
    },
  });
}
