'use client';

import type { BankAccount } from '@prisma/client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { BankAccountFormData } from './bank-account-form/schema';
import BankAccountForm from './bank-account-form';

interface BankAccountsDialogProps {
  isLoading: boolean;
  bankAccount?: BankAccount;
  open: boolean;
  onClose(): void;
  onCreate(arg: BankAccountFormData): void;
  onUpdate(arg: BankAccountFormData & { id: string }): void;
}

export default function BankAccountsDialog({
  isLoading,
  bankAccount,
  open,
  onClose,
  onCreate,
  onUpdate,
}: BankAccountsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New bank account</DialogTitle>
          <DialogDescription>
            Add the details for the new bank account.
          </DialogDescription>
        </DialogHeader>
        <BankAccountForm
          isLoading={isLoading}
          onClose={onClose}
          bankAccount={bankAccount}
          onCreate={onCreate}
          onUpdate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}
