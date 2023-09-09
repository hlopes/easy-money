import * as zod from 'zod';

import { prisma } from '@/lib/prisma';

import { publicProcedure } from '../trpc';

const bankAccountProcedures = {
  getBankAccounts: publicProcedure.query(async () => {
    return await prisma.bankAccount.findMany();
  }),
  createBankAccount: publicProcedure
    .input(
      zod.object({
        name: zod.string(),
        date: zod.date(),
        balance: zod.number().optional(),
        notes: zod.string().optional(),
      })
    )
    .mutation(async (opts) => {
      try {
        const newBankAccount = await prisma.bankAccount.create({
          data: {
            ...opts.input,
          },
        });

        return newBankAccount;
      } catch (error) {
        throw error;
      }
    }),
  updateBankAccount: publicProcedure
    .input(
      zod.object({
        id: zod.string(),
        name: zod.string(),
        date: zod.date(),
        balance: zod.number().optional(),
        notes: zod.string().optional(),
      })
    )
    .mutation(async (opts) => {
      try {
        const updatedBankAccount = await prisma.bankAccount.update({
          where: { id: opts.input.id },
          data: {
            ...opts.input,
          },
        });

        return updatedBankAccount;
      } catch (error) {
        throw error;
      }
    }),
  deleteBankAccount: publicProcedure
    .input(zod.string())
    .mutation(async (opts) => {
      return await prisma.bankAccount.delete({
        where: { id: opts.input },
      });
    }),
};

export default bankAccountProcedures;
