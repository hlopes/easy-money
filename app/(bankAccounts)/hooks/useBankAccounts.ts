import type { BankAccount } from '@prisma/client';

import {
  createBankAccount as createBankAccountAction,
  deleteBankAccount as deleteBankAccountAction,
  updateBankAccount as updateBankAccountAction,
} from '@/app/(bankAccounts)/actions';
import type { BankAccountFormData } from '@/app/(bankAccounts)/components/bank-account-form/schema';
import { useToast } from '@/components/ui/use-toast';

import useOptimisticBankAccounts from './useOptimisticBankAccounts';

export default function useBankAccounts(initialBankAccounts: BankAccount[]) {
  const { toast } = useToast();

  const {
    optimisticBankAccounts,
    optimisticAddBankAccount,
    optimisticUpdateBankAccount,
    optimisticDeleteBankAccount,
  } = useOptimisticBankAccounts(initialBankAccounts);

  const createBankAccount = async (data: BankAccountFormData) => {
    const bankAccountToAdd = { ...data, notes: data.notes ?? null };

    await createBankAccountAction(bankAccountToAdd);

    optimisticAddBankAccount(bankAccountToAdd);
  };

  const updateBankAccount = async (id: string, data: BankAccountFormData) => {
    const bankAccountToUpdate = { ...data, id, notes: data.notes ?? null };

    await updateBankAccountAction(bankAccountToUpdate);

    optimisticUpdateBankAccount(bankAccountToUpdate);
  };

  const deleteBankAccount = async (id: string) => {
    optimisticDeleteBankAccount(id);

    const response = await deleteBankAccountAction(id);

    if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'BankAccount Error',
        description:
          'Something went wrong while trying to delete the bank account.',
      });
    }
  };

  return {
    bankAccounts: optimisticBankAccounts ?? [],
    createBankAccount,
    updateBankAccount,
    deleteBankAccount,
  };
}
