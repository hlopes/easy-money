'use client';

import { useState, useTransition } from 'react';
import { LuEdit3, LuEraser } from 'react-icons/lu';
import cs from 'classnames';
import type { BankAccount, Transaction } from '@prisma/client';

import { deleteTransaction } from '../actions/transactions';

import TransactionForm from './transactionForm';

interface TransactionTableActionsProps {
  bankAccounts?: BankAccount[];
  transactionId: string;
  transactions: Transaction[];
}

export default function TransactionTableActions({
  bankAccounts,
  transactionId,
  transactions,
}: TransactionTableActionsProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [transactionToEdit, setTransactionToEdit] = useState<
    Transaction | undefined
  >();

  const [isDeletingPending, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    startDeleteTransition(() => {
      deleteTransaction(transactionId);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          const foundTransaction = transactions.find(
            (transaction) => transaction.id === transactionId
          );

          if (foundTransaction) {
            setTransactionToEdit(foundTransaction);

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
      <TransactionForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        transaction={transactionToEdit}
        bankAccounts={bankAccounts}
      />
    </>
  );
}
