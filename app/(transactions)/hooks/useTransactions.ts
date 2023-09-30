import {
  createTransaction as createTransactionAction,
  deleteTransaction as deleteTransactionAction,
  updateTransaction as updateTransactionAction,
} from '@/app/(transactions)/actions';
import type { TransactionFormData } from '@/app/(transactions)/components/transaction-form/schema';
import { useToast } from '@/components/ui/use-toast';

import type { TransactionWithCategory } from '../types';

import useOptimisticTransactions from './useOptimisticTransactions';

export default function useTransactions(
  initialTransactions: TransactionWithCategory[]
) {
  const { toast } = useToast();

  const {
    optimisticAddTransaction,
    optimisticDeleteTransaction,
    optimisticTransactions,
    optimisticUpdateTransaction,
  } = useOptimisticTransactions(initialTransactions);

  const createTransaction = async (data: TransactionFormData) => {
    const transactionToAdd = { ...data, notes: data.notes ?? null };

    await createTransactionAction(transactionToAdd);

    optimisticAddTransaction(transactionToAdd);
  };

  const updateTransaction = async (id: string, data: TransactionFormData) => {
    const transactionToUpdate = { ...data, id, notes: data.notes ?? null };

    await updateTransactionAction(transactionToUpdate);

    optimisticUpdateTransaction(transactionToUpdate);
  };

  const deleteTransaction = async (id: string) => {
    optimisticDeleteTransaction(id);

    const response = await deleteTransactionAction(id);

    if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Transaction Error',
        description:
          'Something went wrong while trying to delete the transaction.',
      });
    }
  };

  return {
    transactions: optimisticTransactions ?? [],
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
