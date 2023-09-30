import { prisma } from '@/lib/prisma';

export default async function getTotalBankAccountsForCurrentMonth(): Promise<number> {
  const {
    _sum: { balance },
  } = await prisma.bankAccount.aggregate({
    _sum: {
      balance: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return balance ?? 0;
}
