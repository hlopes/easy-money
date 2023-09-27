import type { Transaction } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export default async function getTransactions(): Promise<Transaction[]> {
  return prisma.transaction.findMany();
}
