'use client';

import { BankAccount } from '@prisma/client';
import cs from 'classnames';
import { useState, useTransition } from 'react';
import { LuEdit3, LuEraser } from 'react-icons/lu';

import BankAccountForm from './bankAccountForm';
import { deleteBankAccount } from '../actions/bankAccounts';

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
