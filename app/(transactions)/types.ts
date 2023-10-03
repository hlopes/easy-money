import type { BankAccount, Category, Transaction } from '@/prisma/client';

type TransactionWithBankAccount = Transaction & { bankAccount?: BankAccount };

type TransactionWithCategory = TransactionWithBankAccount & {
  category?: Category;
};

type TotalSeries = {
  name: string;
  totalIncomes: number;
  totalExpenses: number;
};

export type {
  TotalSeries,
  TransactionWithBankAccount,
  TransactionWithCategory,
};
