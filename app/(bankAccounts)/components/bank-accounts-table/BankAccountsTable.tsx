import type { BankAccount } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';

interface BankAccountsTableProps {
  columns: ColumnDef<BankAccount>[];
  bankAccounts: BankAccount[];
}

export default function BankAccountTable({
  columns,
  bankAccounts,
}: BankAccountsTableProps) {
  return <DataTable columns={columns} data={bankAccounts} />;
}
