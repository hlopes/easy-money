'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { BankAccount, Category, Transaction } from '@/prisma/client';

import type { TransactionFormData } from './transaction-form/schema';
import TransactionForm from './transaction-form/TransactionForm';

interface TransactionDialogProps {
  open: boolean;
  bankAccounts: BankAccount[];
  categories: Category[];
  transaction?: Transaction;
  onAdd(arg: TransactionFormData): void;
  onUpdate(arg: string, arg2: TransactionFormData): void;
  onClose(): void;
}

export default function TransactionDialog({
  open,
  bankAccounts,
  categories,
  transaction,
  onAdd,
  onUpdate,
  onClose,
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
          transaction={transaction}
          bankAccounts={bankAccounts}
          categories={categories}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
