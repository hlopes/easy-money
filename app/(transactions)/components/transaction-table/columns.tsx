import { LuArrowDownRight, LuArrowUpRight } from 'react-icons/lu';
import { type Transaction, TransactionType } from '@prisma/client';
import type { ColumnDef, Row } from '@tanstack/react-table';

import TableActions from '@/components/TableActions';
import { formatDateToDisplay } from '@/helpers/dates';

interface GetColumnsArgs {
  onEdit(arg: string): void;
  onDelete(arg: string): void;
}

const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsArgs): ColumnDef<Transaction>[] => [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type: string = row.getValue('type');

      if (type === TransactionType.EXPENSE) {
        return <LuArrowDownRight className="h-4 w-4 text-red-600" />;
      }

      return <LuArrowUpRight className="h-4 w-4 text-emerald-600" />;
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return formatDateToDisplay(new Date(row.getValue('date')));
    },
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => {
      const type: string = row.getValue('type');

      const value: number = row.getValue('value');

      if (type === TransactionType.EXPENSE) {
        return <p className="text-red-600 font-semibold">{value}€</p>;
      }

      return <p className="text-emerald-600 font-semibold">{value}€</p>;
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <TableActions<Row<Transaction>>
          row={row}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    },
  },
];

export default getColumns;