import type { BankAccount } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';
import type serverClient from '@/lib/trpc/serverClient';

interface BankAccountsTableProps {
  columns: ColumnDef<BankAccount>[];
  bankAccounts: Awaited<ReturnType<(typeof serverClient)['getBankAccounts']>>;
}

export default function BankAccountTable({
  columns,
  bankAccounts,
}: BankAccountsTableProps) {
  return <DataTable columns={columns} data={bankAccounts} />;
}
