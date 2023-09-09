import * as zod from 'zod';
import { type Transaction, TransactionType } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { publicProcedure } from '../trpc';

async function updateBankAccountBalance(
  transaction: Transaction,
  amount: number
) {
  const bankAccount = await prisma.bankAccount.findUnique({
    where: {
      id: transaction?.bankAccountId,
    },
  });

  if (!bankAccount) {
    throw new Error('Could not find bank account');
  }

  await prisma.bankAccount.update({
    where: { id: transaction?.bankAccountId },
    data: { balance: bankAccount.balance + amount },
  });
}

const transactionsProcedures = {
  getTransactions: publicProcedure.query(async () => {
    return await prisma.transaction.findMany();
  }),
  createTransaction: publicProcedure
    .input(
      zod.object({
        type: zod
          .union([zod.literal('INCOME'), zod.literal('EXPENSE')])
          .optional(),
        date: zod.date(),
        value: zod.number(),
        notes: zod.string().optional(),
        bankAccountId: zod.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { bankAccountId, ...inputs } = opts.input;

        const newTransaction = await prisma.transaction.create({
          data: {
            ...inputs,
            bankAccount: {
              connect: { id: bankAccountId },
            },
          },
          include: {
            bankAccount: true,
          },
        });

        const amountToAdd =
          inputs?.type === TransactionType.INCOME
            ? +(inputs?.value ?? 0)
            : -(inputs?.value ?? 0);

        await updateBankAccountBalance(newTransaction, amountToAdd);

        return newTransaction;
      } catch (error) {
        throw error;
      }
    }),
  updateTransaction: publicProcedure
    .input(
      zod.object({
        id: zod.string(),
        type: zod
          .union([zod.literal('INCOME'), zod.literal('EXPENSE')])
          .optional(),
        date: zod.date(),
        value: zod.number(),
        notes: zod.string().optional(),
        bankAccountId: zod.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { bankAccountId, ...inputs } = opts.input;

        const transaction = await prisma.transaction.findUnique({
          where: {
            id: inputs.id,
          },
        });

        if (!transaction) {
          throw new Error('Could not find transaction');
        }

        const amountToRemove =
          transaction?.type === TransactionType.INCOME
            ? -transaction?.value
            : +(transaction?.value ?? 0);

        await updateBankAccountBalance(transaction, amountToRemove);

        const amountToAdd =
          inputs?.type === TransactionType.INCOME
            ? +(inputs?.value ?? 0)
            : -(inputs?.value ?? 0);

        await updateBankAccountBalance(transaction, amountToAdd);

        const updatedTransaction = await prisma.transaction.update({
          where: { id: inputs.id },
          data: { ...inputs },
        });

        return updatedTransaction;
      } catch (error) {
        throw error;
      }
    }),
  deleteTransaction: publicProcedure
    .input(zod.string())
    .mutation(async (opts) => {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id: opts.input,
        },
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      const amountToRemove =
        transaction?.type === TransactionType.INCOME
          ? -transaction?.value
          : +(transaction?.value ?? 0);

      await updateBankAccountBalance(transaction, amountToRemove);

      return await prisma.transaction.delete({
        where: { id: opts.input },
      });
    }),
};

export default transactionsProcedures;
