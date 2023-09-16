'use client';

import type { BankAccount, Category, Transaction } from '@prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { TransactionFormData } from './transaction-form/schema';
import TransactionForm from './transaction-form/TransactionForm';

interface TransactionDialogProps {
  isLoading: boolean;
  bankAccounts: BankAccount[];
  categories: Category[];
  transaction?: Transaction;
  open: boolean;
  onClose(): void;
  onCreate(arg: TransactionFormData): void;
  onUpdate(arg: TransactionFormData & { id: string }): void;
}

export default function TransactionDialog({
  isLoading,
  bankAccounts,
  categories,
  transaction,
  open,
  onClose,
  onCreate,
  onUpdate,
}: TransactionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New bank account</DialogTitle>
          <DialogDescription>
            Add the details for the new bank account.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          isLoading={isLoading}
          onClose={onClose}
          transaction={transaction}
          bankAccounts={bankAccounts}
          categories={categories}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
