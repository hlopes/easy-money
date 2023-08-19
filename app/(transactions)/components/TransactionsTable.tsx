import cs from 'classnames';
import type { Transaction } from '@prisma/client';

import { formatDateToDisplay } from '@/helpers/dates';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Bank Account</th>
          <th>Value</th>
          <th>Date</th>
          <th className="hidden sm:block">Notes</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.bankAccountId}</td>
              <td
                className={cs('font-medium', {
                  ['text-accent']: transaction.value >= 0,
                  ['text-error']: transaction.value < 0,
                })}>
                {transaction.value}€
              </td>
              <td>{formatDateToDisplay(new Date(transaction.date))}</td>
              <td className="hidden sm:block">{transaction.notes}</td>
              <td className="flex gap-2 justify-end">actions</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
