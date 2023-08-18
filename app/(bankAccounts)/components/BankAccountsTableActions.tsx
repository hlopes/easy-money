'use client';

import { useState, useTransition } from 'react';
import { LuEdit3, LuEraser } from 'react-icons/lu';
import cs from 'classnames';
import type { BankAccount } from '@prisma/client';

import { deleteBankAccount } from '../actions/bankAccounts';

import BankAccountForm from './bankAccountForm';

interface BankAccountTableActionsProps {
  bankAccountId: string;
  bankAccounts: BankAccount[];
}

export default function BankAccountsTableActions({
  bankAccountId,
  bankAccounts,
}: BankAccountTableActionsProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [bankAccountToEdit, setBankAccountToEdit] = useState<
    BankAccount | undefined
  >();

  const [isDeletingPending, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    startDeleteTransition(() => {
      deleteBankAccount(bankAccountId);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          const foundAccount = bankAccounts.find(
            (account) => account.id === bankAccountId
          );

          if (foundAccount) {
            setBankAccountToEdit(foundAccount);

            setIsFormModalOpen(true);
          }
        }}
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
      <BankAccountForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        bankAccount={bankAccountToEdit}
      />
    </>
  );
}
