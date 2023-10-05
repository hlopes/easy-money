import { prisma } from '@/lib/prisma';

export default async function getTotalBankAccountsForCurrentMonth(
  userId?: string
): Promise<number> {
  if (!userId) {
  }

  try {
    const {
      _sum: { balance },
    } = await prisma.bankAccount.aggregate({
      _sum: {
        balance: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId,
      },
    });

    return balance ?? 0;
  } catch (error) {
    return 0;
  }
}
