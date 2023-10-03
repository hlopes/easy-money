import { format } from 'date-fns';

import { prisma } from '@/lib/prisma';
import { TransactionType } from '@/prisma/client';

import type { TotalSeries } from '../types';

export default async function getTransactionTotalsByMonth(): Promise<
  TotalSeries[]
> {
  try {
    const records = await prisma.transaction.findMany({
      select: {
        id: true,
        date: true,
        value: true,
        type: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const totalsPerMonth = records.reduce(
      (acc: Record<string, TotalSeries>, record) => {
        const month = record.date.getMonth();

        const year = record.date.getFullYear();

        const monthKey = format(new Date(year, month, 1), 'MMM');

        if (!acc[monthKey]) {
          acc[monthKey] = { name: monthKey, totalIncomes: 0, totalExpenses: 0 };
        }

        acc[monthKey] = {
          ...acc[monthKey],
          totalIncomes:
            record.type === TransactionType.INCOME
              ? acc[monthKey].totalIncomes + record.value
              : acc[monthKey].totalIncomes,
          totalExpenses:
            record.type === TransactionType.EXPENSE
              ? acc[monthKey].totalExpenses + record.value
              : acc[monthKey].totalExpenses,
        };

        return acc;
      },
      {}
    );

    return Object.values(totalsPerMonth);
  } catch (error) {
    return [];
  }
}
