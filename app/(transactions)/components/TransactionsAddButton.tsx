'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import type { BankAccount } from '@prisma/client';

import TransactionForm from './transactionForm';

interface TransactionAddButtonProps {
  bankAccounts?: BankAccount[];
}

export default function TransactionsAddButton({
  bankAccounts,
}: TransactionAddButtonProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-sm"
        onClick={() => setIsFormModalOpen(true)}
        disabled={!bankAccounts?.length}>
        <LuPlus />
        Add New
      </button>
      {!bankAccounts?.length && (
        <p className="text-xs mt-2">
          You need to create accounts before starting to add transactions...
        </p>
      )}
      <TransactionForm
        bankAccounts={bankAccounts}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />
    </>
  );
}
