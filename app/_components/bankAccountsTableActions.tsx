'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LuEdit3, LuEraser } from 'react-icons/lu';
import cs from 'classnames';

import { deleteBankAccount } from '@/app/_server-actions/bankAccounts';

interface BankAccountTableActionsProps {
  bankAccountId: string;
}

export default function BankAccountsTableActions({
  bankAccountId,
}: BankAccountTableActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    deleteBankAccount(bankAccountId);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <>
      <button
        className={cs('btn btn-sm btn-circle', {
          ['btn-disabled']: isPending,
        })}>
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <LuEdit3 />
        )}
      </button>
      <button
        onClick={() => handleDelete()}
        className={cs('btn btn-sm btn-circle', {
          ['btn-disabled']: isPending,
        })}>
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <LuEraser />
        )}
      </button>
    </>
  );
}
