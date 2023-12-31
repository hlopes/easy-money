'use client';

import { LuEraser, LuLoader2, LuPencil } from 'react-icons/lu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TransactionsTableActionsProps<T> {
  row: T;
  onEdit(arg: string): void;
  onDelete(arg: string): void;
  isLoading?: boolean;
}

export default function TableActions<T extends { original: { id: string } }>({
  row,
  onEdit,
  onDelete,
  isLoading = false,
}: TransactionsTableActionsProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoading ? (
          <LuLoader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onEdit(row.original.id);
          }}>
          <LuPencil className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row.original.id)}>
          <LuEraser className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
