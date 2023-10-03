'use client';

import { useMemo, useState } from 'react';

import {
  BankAccountsTable,
  getColumns,
} from '@/app/(bankAccounts)/components/bank-accounts-table';
import BankAccountsDialog from '@/app/(bankAccounts)/components/BankAccountsDialog';
import useBankAccounts from '@/app/(bankAccounts)/hooks/useBankAccounts';
import ButtonAdd from '@/components/ButtonAdd';
import PageTop from '@/components/PageTop';
import type { BankAccount } from '@/prisma/client';

type BankAccountManagerProps = {
  initialBankAccounts: BankAccount[];
};

export default function BankAccountManager({
  initialBankAccounts,
}: BankAccountManagerProps) {
  const {
    bankAccounts,
    createBankAccount,
    updateBankAccount,
    deleteBankAccount,
  } = useBankAccounts(initialBankAccounts);

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
        onDelete: async (id) => {
          deleteBankAccount(id);
        },
        onEdit: (id) => {
          setSelectedBankAccountIdForEdit(id);
        },
      }),
    [deleteBankAccount]
  );

  const handleOpenDialog = () => setIsFormModalOpen(true);

  const handleCloseDialog = () => {
    setIsFormModalOpen(false);

    setSelectedBankAccountIdForEdit(null);
  };

  return (
    <>
      <PageTop title="Bank Accounts">
        <ButtonAdd onClick={handleOpenDialog} />
      </PageTop>
      <div className="overflow-x-auto my-2">
        <BankAccountsTable columns={columns} bankAccounts={bankAccounts} />
      </div>
      <BankAccountsDialog
        open={isFormModalOpen || !!selectedBankAccountIdForEdit}
        bankAccount={selectedBankAccountForEdit}
        onAdd={createBankAccount}
        onUpdate={updateBankAccount}
        onClose={handleCloseDialog}
      />
    </>
  );
}
