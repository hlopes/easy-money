import type { BankAccount, Transaction } from '@prisma/client';

type TransactionWithBankAccount = Transaction & { bankAccount: BankAccount };

export type { TransactionWithBankAccount };
