'use server';

import { revalidatePath } from 'next/cache';

import type { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/prisma';
import type { BankAccount } from '@/prisma/client';

import { BANK_ACCOUNTS_PATH } from './constants';

export default async function deleteBankAccount(
  id: string
): Promise<BankAccount | ErrorResponse> {
  try {
    const bankAccount = await prisma.bankAccount.delete({
      where: { id },
    });

    revalidatePath(BANK_ACCOUNTS_PATH);

    return bankAccount;
  } catch (error) {
    return { error: true };
  }
}
