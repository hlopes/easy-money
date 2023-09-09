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
    cell: ({ row }) => {
      const name: string = row.getValue('name');

      return <p className="font-semibold">{name}</p>;
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
    accessorKey: 'balance',
    header: 'Balance',
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
  },
  {
    id: 'actions',
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