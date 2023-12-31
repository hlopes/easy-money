'use client';

import { useMemo, useState } from 'react';

import useBankAccounts from '@/app/(bankAccounts)/hooks/useBankAccounts';
import ButtonAdd from '@/components/ButtonAdd';
import PageTop from '@/components/PageTop';
import type { BankAccount, Category } from '@/prisma/client';

import useTransactions from '../hooks/useTransactions';
import type { TransactionWithCategory } from '../types';

import TransactionsTable from './transaction-table';
import TransactionDialog from './TransactionsDialog';

interface TransactionsManagerProps {
  initialTransactions: TransactionWithCategory[];
  initialBankAccounts: BankAccount[];
  initialCategories: Category[];
}

export default function TransactionsManager({
  initialTransactions,
  initialBankAccounts,
  initialCategories,
}: TransactionsManagerProps) {
  const {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions(initialTransactions);

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

  const { bankAccounts } = useBankAccounts(initialBankAccounts);

  const handleOpenDialog = () => setIsFormModalOpen(true);

  const handleCloseDialog = () => {
    setIsFormModalOpen(false);

    setSelectedTransactionIdForEdit(null);
  };

  return (
    <>
      <PageTop title="Transactions">
        <ButtonAdd onClick={handleOpenDialog} />
      </PageTop>
      <div className="my-2 overflow-x-auto">
        <TransactionsTable
          transactions={transactions}
          onEdit={(id) => {
            setSelectedTransactionIdForEdit(id);
          }}
          onDelete={deleteTransaction}
        />
      </div>
      <TransactionDialog
        open={isFormModalOpen || !!selectedTransactionIdForEdit}
        transaction={selectedTransactionForEdit}
        bankAccounts={bankAccounts}
        categories={initialCategories}
        onAdd={createTransaction}
        onUpdate={updateTransaction}
        onClose={handleCloseDialog}
      />
    </>
  );
}
