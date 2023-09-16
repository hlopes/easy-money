'use client';

import { useMemo, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

import useBankAccounts from '@/app/(bankAccounts)/hooks/useBankAccounts';
import { Button } from '@/components/ui/button';
import type serverClient from '@/lib/trpc/serverClient';

import useTransactions from '../hooks/useTransactions';

import TransactionsTable from './transaction-table';
import TransactionDialog from './TransactionsDialog';

interface TransactionsManagerProps {
  initialTransactions: Awaited<
    ReturnType<(typeof serverClient)['getTransactions']>
  >;
  initialBankAccounts: Awaited<
    ReturnType<(typeof serverClient)['getBankAccounts']>
  >;
}

export default function TransactionsManager({
  initialTransactions,
  initialBankAccounts,
}: TransactionsManagerProps) {
  const {
    transactions,
    categories,
    isFetchingCategories,
    isLoadingCreateTransaction,
    isLoadingUpdateTransaction,
    isLoadingDeleteTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions({ initialTransactions });

  console.log('### categories', categories);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [selectedTransactionIdForEdit, setSelectedTransactionIdForEdit] =
    useState<string | null>(null);

  const selectedTransactionForEdit = useMemo(
    () =>
      transactions.find(
        (transaction) => transaction.id === selectedTransactionIdForEdit
      ),
    [transactions, selectedTransactionIdForEdit]
  );

  const { bankAccounts } = useBankAccounts({ initialBankAccounts });

  return (
    <>
      <section className="prose my-2 w-full flex justify-between">
        <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Transactions
        </h2>
        <Button
          onClick={() => setIsFormModalOpen(true)}
          disabled={isLoadingDeleteTransaction}>
          <LuPlus />
          Add New
        </Button>
      </section>
      <div className="overflow-x-auto my-2">
        <TransactionsTable
          transactions={transactions}
          onEdit={(id) => {
            setSelectedTransactionIdForEdit(id);
          }}
          onDelete={deleteTransaction}
        />
      </div>
      <TransactionDialog
        isLoading={
          isFetchingCategories ||
          isLoadingCreateTransaction ||
          isLoadingUpdateTransaction
        }
        open={isFormModalOpen || !!selectedTransactionIdForEdit}
        onClose={() => {
          setIsFormModalOpen(false);

          setSelectedTransactionIdForEdit(null);
        }}
        transaction={selectedTransactionForEdit}
        bankAccounts={bankAccounts}
        categories={categories}
        onCreate={createTransaction}
        onUpdate={updateTransaction}
      />
    </>
  );
}
