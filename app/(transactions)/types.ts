import type { BankAccount, Category, Transaction } from '@prisma/client';

type TransactionWithBankAccount = Transaction & { bankAccount: BankAccount };

type TransactionWithCategory = TransactionWithBankAccount & {
  category: Category;
};

export type { TransactionWithBankAccount, TransactionWithCategory };
