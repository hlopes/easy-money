import trpc from '@/lib/trpc/client';
import type serverClient from '@/lib/trpc/serverClient';

interface UseBankAccountsArgs {
  initialBankAccounts: Awaited<
    ReturnType<(typeof serverClient)['getBankAccounts']>
  >;
}

export default function useBankAccounts(args?: UseBankAccountsArgs) {
  const initialBankAccounts = args?.initialBankAccounts ?? [];

  const {
    refetch: refetchBankAccounts,
    data: bankAccounts,
    isFetching: isFetchingGetBankAccounts,
  } = trpc.getBankAccounts.useQuery(undefined, {
    initialData: initialBankAccounts,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { mutate: createBankAccount, isLoading: isLoadingCreateBankAccount } =
    trpc.createBankAccount.useMutation({
      onSettled: () => {
        refetchBankAccounts();
      },
    });

  const { mutate: updateBankAccount, isLoading: isLoadingUpdateBankAccount } =
    trpc.updateBankAccount.useMutation({
      onSettled: () => {
        refetchBankAccounts();
      },
    });

  const { mutate: deleteBankAccount, isLoading: isLoadingDeleteBankAccount } =
    trpc.deleteBankAccount.useMutation({
      onSettled: () => {
        refetchBankAccounts();
      },
    });

  return {
    bankAccounts,
    isFetchingGetBankAccounts,
    isLoadingCreateBankAccount,
    isLoadingUpdateBankAccount,
    isLoadingDeleteBankAccount,
    refetchBankAccounts,
    createBankAccount,
    updateBankAccount,
    deleteBankAccount,
  };
}
