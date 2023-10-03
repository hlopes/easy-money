import BankAccountForm from '@/app/(bankAccounts)/components/bank-account-form';
import type { BankAccountFormData } from '@/app/(bankAccounts)/components/bank-account-form/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { BankAccount } from '@/prisma/client';

type BankAccountsDialogProps = {
  open: boolean;
  bankAccount?: BankAccount;
  onAdd(arg: BankAccountFormData): Promise<void>;
  onUpdate(arg: string, arg2: BankAccountFormData): Promise<void>;
  onClose(): void;
};

export default function BankAccountsDialog({
  open,
  bankAccount,
  onAdd,
  onUpdate,
  onClose,
}: BankAccountsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New bank account</DialogTitle>
          <DialogDescription>
            {bankAccount
              ? 'Update the details of the bank account.'
              : 'Add the details for the new bank account.'}
          </DialogDescription>
        </DialogHeader>
        <BankAccountForm
          bankAccount={bankAccount}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
