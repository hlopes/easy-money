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
    queryKey: ['getTransactions', undefined],
    initialData: initialTransactions,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { mutate: createTransaction, isLoading: isLoadingCreateTransaction } =
    trpc.createTransaction.useMutation({
      onSettled: () => {
        refetchTransactions();

        refetchBankAccounts();
      },
    });

  const { mutate: updateTransaction, isLoading: isLoadingUpdateTransaction } =
    trpc.updateTransaction.useMutation({
      onSettled: () => {
        refetchTransactions();

        refetchBankAccounts();
      },
    });

  const { mutate: deleteTransaction, isLoading: isLoadingDeleteTransaction } =
    trpc.deleteTransaction.useMutation({
      onSettled: () => {
        refetchTransactions();

        refetchBankAccounts();
      },
    });

  return {
    transactions,
    isFetchingTransactions,
    isLoadingCreateTransaction,
    isLoadingUpdateTransaction,
    isLoadingDeleteTransaction,
    refetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
