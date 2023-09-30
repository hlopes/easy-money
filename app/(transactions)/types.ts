import type { BankAccount, Category, Transaction } from '@prisma/client';

type TransactionWithBankAccount = Transaction & { bankAccount: BankAccount };

type TransactionWithCategories = TransactionWithBankAccount & {
  categories?: {
    category: Category;
    transactionId: string;
    categoryId: string;
    assignedAt: Date;
  }[];
};

export type { TransactionWithBankAccount, TransactionWithCategories };
