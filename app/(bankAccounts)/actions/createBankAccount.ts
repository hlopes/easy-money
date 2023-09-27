'use server';

import { revalidatePath } from 'next/cache';
import type { BankAccount } from '@prisma/client';

import type { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/prisma';

import { BANK_ACCOUNTS_PATH } from './constants';

export default async function createBankAccount(
  data: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt'>
): Promise<BankAccount | ErrorResponse> {
  try {
    const newBankAccount = await prisma.bankAccount.create({
      data,
    });

    revalidatePath(BANK_ACCOUNTS_PATH);

    return newBankAccount;
  } catch (error) {
    return { error: true };
  }
}
