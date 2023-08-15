'use client';

import { useTransition } from 'react';
import { LuEdit3, LuEraser } from 'react-icons/lu';
import cs from 'classnames';

import { deleteBankAccount } from '../actions/bankAccounts';

interface BankAccountTableActionsProps {
  bankAccountId: string;
}

export default function BankAccountsTableActions({
  bankAccountId,
}: BankAccountTableActionsProps) {
  const [isDeletingPending, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    startDeleteTransition(() => {
      deleteBankAccount(bankAccountId);
    });
  };

  return (
    <>
      <button
        className={cs('btn btn-sm btn-circle', {
          ['btn-disabled loading loading-spinner loading-xs']:
            isDeletingPending,
        })}>
        <LuEdit3 />
      </button>
      <button
        onClick={() => handleDelete()}
        className={cs('btn btn-sm btn-circle', {
          ['btn-disabled loading loading-spinner loading-xs']:
            isDeletingPending,
        })}>
        <LuEraser />
      </button>
    </>
  );
}
