'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LuEdit3, LuEraser } from 'react-icons/lu';

import { deleteBankAccount } from '@/services/bankAccounts';

interface BankAccountTableActionsProps {
  bankAccountId: string;
}

export default function BankAccountsTableActions({
  bankAccountId,
}: BankAccountTableActionsProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  console.log('### isPending', isPending);

  const handleDelete = async () => {
    deleteBankAccount(bankAccountId);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <>
      <button className="btn btn-sm btn-circle">
        <LuEdit3 />
      </button>
      <button className="btn btn-sm btn-circle">
        <LuEraser onClick={() => handleDelete()} />
      </button>
    </>
  );
}
