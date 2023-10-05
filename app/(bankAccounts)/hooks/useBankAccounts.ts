import { useAuth } from '@clerk/nextjs';

import {
  createBankAccount as createBankAccountAction,
  deleteBankAccount as deleteBankAccountAction,
  updateBankAccount as updateBankAccountAction,
} from '@/app/(bankAccounts)/actions';
import type { BankAccountFormData } from '@/app/(bankAccounts)/components/bank-account-form/schema';
import { useToast } from '@/components/ui/use-toast';
import type { BankAccount } from '@/prisma/client';

import useOptimisticBankAccounts from './useOptimisticBankAccounts';

export default function useBankAccounts(initialBankAccounts: BankAccount[]) {
  const { userId } = useAuth();

  const { toast } = useToast();

  const {
    optimisticBankAccounts,
    optimisticAddBankAccount,
    optimisticUpdateBankAccount,
    optimisticDeleteBankAccount,
  } = useOptimisticBankAccounts(initialBankAccounts);

  const createBankAccount = async (data: BankAccountFormData) => {
    const bankAccountToAdd = { ...data, notes: data.notes ?? null };

    if (!userId) {
      throw new Error('User not found');
    }

    const bankAccountWithUserId = { ...bankAccountToAdd, userId };

    await createBankAccountAction(bankAccountWithUserId);

    optimisticAddBankAccount(bankAccountWithUserId);
  };

  const updateBankAccount = async (id: string, data: BankAccountFormData) => {
    const bankAccountToUpdate = { ...data, id, notes: data.notes ?? null };

    if (!userId) {
      throw new Error('User not found');
    }

    const bankAccountWithUserId = { ...bankAccountToUpdate, userId };

    await updateBankAccountAction(bankAccountWithUserId);

    optimisticUpdateBankAccount(bankAccountWithUserId);
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
