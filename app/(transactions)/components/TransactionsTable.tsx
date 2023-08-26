'use client';

import { LuArrowDownRight, LuArrowUpRight } from 'react-icons/lu';
import cs from 'classnames';
import useSWR from 'swr';
import type { BankAccount } from '@prisma/client';

import { formatDateToDisplay } from '@/helpers/dates';

import { getFilteredTransactions } from '../actions/transactions';
import type { TransactionWithBankAccount } from '../types';

import TransactionTableActions from './TransactionsTableActions';

interface TransactionsTableProps {
  bankAccounts?: BankAccount[];
}

export default function TransactionsTable({
  bankAccounts,
}: TransactionsTableProps) {
  const {
    data: transactions,
    //error,
    isLoading,
  } = useSWR<TransactionWithBankAccount[]>(
    '/transactions',
    getFilteredTransactions
  );

  // TODO
  //console.log('### error', error);

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
        {isLoading ? (
          <tr>
            <td>
              <span className="loading loading-spinner loading-sm" />
            </td>
          </tr>
        ) : null}
        {transactions
          ? transactions.map((transaction) => {
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
            })
          : null}
      </tbody>
    </table>
  );
}
