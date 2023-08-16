'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

import BankAccountForm from './bankAccountForm';

export default function BankAccountsAddButton() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <>
      <button className="btn btn-sm" onClick={() => setIsFormModalOpen(true)}>
        <LuPlus />
        Add New
      </button>
      <BankAccountForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />
    </>
  );
}
