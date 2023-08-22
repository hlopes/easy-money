import { LuArrowDownRight, LuArrowUpRight } from 'react-icons/lu';
import cs from 'classnames';
import type { BankAccount } from '@prisma/client';

import { formatDateToDisplay } from '@/helpers/dates';

import { getTransactions } from '../actions/transactions';

import TransactionTableActions from './TransactionsTableActions';

interface TransactionsTableProps {
  bankAccounts?: BankAccount[];
}

export default async function TransactionsTable({
  bankAccounts,
}: TransactionsTableProps) {
  const transactions = await getTransactions();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Bank Account</th>
          <th>Value</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td>{formatDateToDisplay(new Date(transaction.date))}</td>
              <td>
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={transaction.type}>
                  {transaction.type === 'income' ? (
                    <LuArrowUpRight className="text-xl text-accent" />
                  ) : (
                    <LuArrowDownRight className="text-xl text-error" />
                  )}
                </div>
              </td>
              <td>{transaction.bankAccount.name}</td>
              <td
                className={cs('font-medium', {
                  ['text-accent']: transaction.type === 'income',
                  ['text-error']: transaction.type === 'expense',
                })}>
                {transaction.type === 'expense'
                  ? `-${transaction.value}`
                  : transaction.value}
                €
              </td>
              <td className="flex gap-2 justify-end">
                <TransactionTableActions
                  bankAccounts={bankAccounts}
                  transactionId={transaction.id}
                  transactions={transactions}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
