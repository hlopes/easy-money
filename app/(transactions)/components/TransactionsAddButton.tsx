'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

export default function TransactionsAddButton() {
  const [, setIsFormModalOpen] = useState(false);

  return (
    <button className="btn btn-sm" onClick={() => setIsFormModalOpen(true)}>
      <LuPlus />
      Add New
    </button>
  );
}
