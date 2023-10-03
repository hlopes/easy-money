import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

import { prisma } from '@/lib/prisma';
import type { TransactionType } from '@/prisma/client';

export default async function getTotalByTransactionType(
  type: TransactionType
): Promise<{
  totalCurrentMonth: number;
  delta: number;
}> {
  const currentDate = new Date();

  const startOfCurrentMonth = startOfMonth(currentDate);

  const endOfCurrentMonth = endOfMonth(currentDate);

  const {
    _sum: { value: totalCurrentMonth },
  } = await prisma.transaction.aggregate({
    _sum: {
      value: true,
    },
    where: {
      type: {
        equals: type,
      },
      date: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    },
  });

  const startOfPreviousMonth = startOfMonth(subMonths(currentDate, 1));

  const endOfPreviousMonth = endOfMonth(subMonths(currentDate, 1));

  const {
    _sum: { value: totalPreviousMonth },
  } = await prisma.transaction.aggregate({
    _sum: {
      value: true,
    },
    where: {
      type: {
        equals: type,
      },
      date: {
        gte: startOfPreviousMonth,
        lte: endOfPreviousMonth,
      },
    },
  });

  return {
    totalCurrentMonth: totalCurrentMonth ?? 0,
    delta: Number(
      (((totalCurrentMonth ?? 0) - (totalPreviousMonth ?? 0)) * 100) /
        (totalPreviousMonth ?? 0)
    ),
  };
}
