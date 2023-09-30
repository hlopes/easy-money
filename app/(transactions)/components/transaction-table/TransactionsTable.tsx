'use client';

import { useMemo } from 'react';
import type { Transaction } from '@prisma/client';

import { DataTable } from '@/components/ui/data-table';

import type { TransactionWithCategory } from '../../types';

import getColumns from './columns';

interface TransactionsTableProps {
  transactions: TransactionWithCategory[];
  onEdit(arg: string): void;
  onDelete(arg: string): void;
}

export default function TransactionsTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionsTableProps) {
  const columns = useMemo(
    () => getColumns({ onDelete, onEdit }),
    [onDelete, onEdit]
  );

  return <DataTable columns={columns} data={transactions} />;
}
