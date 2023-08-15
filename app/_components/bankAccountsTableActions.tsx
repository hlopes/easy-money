'use client';

import { LuEdit3, LuEraser } from 'react-icons/lu';

import { deleteBankAccount } from '@/app/_server-actions/bankAccounts';

interface BankAccountTableActionsProps {
  bankAccountId: string;
}

export default function BankAccountsTableActions({
  bankAccountId,
}: BankAccountTableActionsProps) {
  const handleDelete = async () => {
    deleteBankAccount(bankAccountId);
  };

  return (
    <>
      <button className="btn btn-sm btn-circle">
        <LuEdit3 />
      </button>
      <button onClick={() => handleDelete()} className="btn btn-sm btn-circle">
        <LuEraser />
      </button>
    </>
  );
}
