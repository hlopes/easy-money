'use server';

import { revalidatePath } from 'next/cache';
import type { BankAccount } from '@prisma/client';

import type { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/prisma';

import { BANK_ACCOUNTS_PATH } from './constants';

export default async function updateBankAccount(
  data: Omit<BankAccount, 'createdAt' | 'updatedAt'>
): Promise<BankAccount | ErrorResponse> {
  try {
    const updatedBankAccount = await prisma.bankAccount.update({
      where: { id: data.id },
      data,
    });

    revalidatePath(BANK_ACCOUNTS_PATH);

    return updatedBankAccount;
  } catch (error) {
    return { error: true };
  }
}
