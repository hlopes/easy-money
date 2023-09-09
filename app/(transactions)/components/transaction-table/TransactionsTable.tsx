'use client';

import { useMemo } from 'react';

import { DataTable } from '@/components/ui/data-table';
import type serverClient from '@/lib/trpc/serverClient';

import getColumns from './columns';

interface TransactionsTableProps {
  transactions: Awaited<ReturnType<(typeof serverClient)['getTransactions']>>;
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
