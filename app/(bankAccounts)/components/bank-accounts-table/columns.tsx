import type { BankAccount } from '@prisma/client';
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
}: GetColumnsArgs): ColumnDef<BankAccount>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
    maxSize: 100,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    maxSize: 100,
    cell: ({ row }) => {
      return formatDateToDisplay(new Date(row.getValue('date')));
    },
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    maxSize: 100,
    cell: ({ row }) => {
      const value: number = row.getValue('balance');

      if (value > 0) {
        return <p className="text-green-600 font-semibold">{value}€</p>;
      }

      if (value < 0) {
        return <p className="text-red-600 font-semibold">{value}€</p>;
      }

      return <p className="font-semibold">{value}€</p>;
    },
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    maxSize: 100,
  },
  {
    id: 'actions',
    maxSize: 100,
    cell: ({ row }) => {
      return (
        <TableActions<Row<BankAccount>>
          row={row}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    },
  },
];

export default getColumns;
