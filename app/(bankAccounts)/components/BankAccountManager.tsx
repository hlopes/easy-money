'use client';

import { useMemo, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import type serverClient from '@/lib/trpc/serverClient';

import useBankAccounts from '../hooks/useBankAccounts';

import getColumns from './bank-accounts-table/columns';
import BankAccountsTable from './bank-accounts-table';
import BankAccountsDialog from './BankAccountsDialog';

interface BankAccountManagerProps {
  initialBankAccounts: Awaited<
    ReturnType<(typeof serverClient)['getBankAccounts']>
  >;
}

export default function BankAccountManager({
  initialBankAccounts,
}: BankAccountManagerProps) {
  const {
    bankAccounts,
    isLoadingCreateBankAccount,
    isLoadingUpdateBankAccount,
    isLoadingDeleteBankAccount,
    createBankAccount,
    updateBankAccount,
    deleteBankAccount,
  } = useBankAccounts({ initialBankAccounts });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [selectedBankAccountIdForEdit, setSelectedBankAccountIdForEdit] =
    useState<string | null>(null);

  const selectedBankAccountForEdit = useMemo(
    () =>
      bankAccounts.find(
        (account) => account.id === selectedBankAccountIdForEdit
      ),
    [bankAccounts, selectedBankAccountIdForEdit]
  );

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: deleteBankAccount,
        onEdit: (id) => {
          setSelectedBankAccountIdForEdit(id);
        },
      }),
    [deleteBankAccount]
  );

  return (
    <>
      <section className="prose my-2 w-full flex justify-between">
        <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
          Bank Accounts
        </h2>
        <Button
          onClick={() => setIsFormModalOpen(true)}
          disabled={isLoadingDeleteBankAccount}>
          <LuPlus />
          Add New
        </Button>
      </section>
      <div className="overflow-x-auto my-2">
        <BankAccountsTable columns={columns} bankAccounts={bankAccounts} />
      </div>
      <BankAccountsDialog
        open={isFormModalOpen || !!selectedBankAccountIdForEdit}
        onClose={() => {
          setIsFormModalOpen(false);

          setSelectedBankAccountIdForEdit(null);
        }}
        isLoading={isLoadingCreateBankAccount || isLoadingUpdateBankAccount}
        bankAccount={selectedBankAccountForEdit}
        onCreate={createBankAccount}
        onUpdate={updateBankAccount}
      />
    </>
  );
}
