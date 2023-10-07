import { endOfMonth, startOfYear } from 'date-fns';

import { prisma } from '@/lib/prisma';
import type { TransactionType } from '@/prisma/client';

import getCategories from './getCategories';

export default async function getTotalByCategoryYear(
  type: TransactionType,
  userId?: string
): Promise<
  {
    name: string;
    value: number;
  }[]
> {
  if (!userId) {
    return [];
  }

  try {
    const currentDate = new Date();

    const startOfCurrentYear = startOfYear(currentDate);

    const endOfCurrentYear = endOfMonth(currentDate);

    const result = await prisma.transaction.groupBy({
      by: 'categoryId',
      _sum: {
        value: true,
      },
      where: {
        type: {
          equals: type,
        },
        date: {
          gte: startOfCurrentYear,
          lte: endOfCurrentYear,
        },
        userId,
      },
    });

    const categories = await getCategories();

    return result.map((sumCategory) => ({
      name:
        categories.find((category) => category.id === sumCategory.categoryId)
          ?.name ?? 'unknown',
      value: sumCategory._sum.value ?? 0,
    }));
  } catch (error) {
    return [];
  }
}
