import cs from 'classnames';
import { BankAccount } from '@prisma/client';

import BankAccountsTableActions from './BankAccountsTableActions';
import { formatDateToDisplay } from '../helpers/dates';

interface BankAccountTableProps {
  bankAccounts: BankAccount[];
}

export default function BankAccountTable({
  bankAccounts,
}: BankAccountTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Initial Balance</th>
          <th className="hidden sm:block">Notes</th>
          <th>Creation Date</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bankAccounts.map((bankAccount) => {
          return (
            <tr key={bankAccount.id}>
              <td>{bankAccount.name}</td>
              <td
                className={cs('font-medium', {
                  ['text-accent']: bankAccount.balance >= 0,
                  ['text-error']: bankAccount.balance < 0,
                })}>
                {bankAccount.balance}€
              </td>
              <td className="hidden sm:block">{bankAccount.notes}</td>
              <td>{formatDateToDisplay(new Date(bankAccount.date))}</td>
              <td className="flex gap-2 justify-end">
                <BankAccountsTableActions bankAccountId={bankAccount.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
