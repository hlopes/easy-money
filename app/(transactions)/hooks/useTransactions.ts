import useBankAccounts from '@/app/(bankAccounts)/hooks/useBankAccounts';
import trpc from '@/lib/trpc/client';
import type serverClient from '@/lib/trpc/serverClient';

interface UseTransactionsArgs {
  initialTransactions: Awaited<
    ReturnType<(typeof serverClient)['getTransactions']>
  >;
}

export default function useTransactions({
  initialTransactions,
}: UseTransactionsArgs) {
  const { refetchBankAccounts } = useBankAccounts();

  const {
    refetch: refetchTransactions,
    data: transactions,
    isFetching: isFetchingTransactions,
  } = trpc.getTransactions.useQuery(undefined, {
    initialData: initialTransactions,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    refetch: refetchCategories,
    data: categories,
    isFetching: isFetchingCategories,
  } = trpc.getCategories.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { mutate: createTransaction, isLoading: isLoadingCreateTransaction } =
    trpc.createTransaction.useMutation({
      onSuccess: () => {
        refetchTransactions();

        refetchBankAccounts();

        refetchCategories();
      },
    });

  const { mutate: updateTransaction, isLoading: isLoadingUpdateTransaction } =
    trpc.updateTransaction.useMutation({
      onSuccess: () => {
        refetchTransactions();

        refetchBankAccounts();

        refetchCategories();
      },
    });

  const { mutate: deleteTransaction, isLoading: isLoadingDeleteTransaction } =
    trpc.deleteTransaction.useMutation({
      onSuccess: () => {
        refetchTransactions();

        refetchBankAccounts();

        refetchCategories();
      },
    });

  return {
    transactions,
    categories,
    isFetchingTransactions,
    isFetchingCategories,
    isLoadingCreateTransaction,
    isLoadingUpdateTransaction,
    isLoadingDeleteTransaction,
    refetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    refetchCategories,
  };
}
