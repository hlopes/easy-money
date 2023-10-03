import { prisma } from '@/lib/prisma';
import type { Transaction } from '@/prisma/client';

export async function updateBankAccountBalance(
  transaction: Transaction,
  amount: number
) {
  const bankAccount = await prisma.bankAccount.findUnique({
    where: {
      id: transaction?.bankAccountId,
    },
  });

  if (!bankAccount) {
    throw new Error('Could not find the bank account');
  }

  await prisma.bankAccount.update({
    where: { id: transaction?.bankAccountId },
    data: { balance: bankAccount.balance + amount },
  });
}
