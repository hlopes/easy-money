import { getBankAccounts } from '@/services/bankAccounts';

import {
  BankAccountsTableActions,
  BankAccountsAddButton,
} from '@/app/_components';

function formatDateToDisplay(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}-${month}-${year}`;
}

export default async function Home() {
  const bankAccounts = await getBankAccounts();

  return (
    <main>
      <article className="prose my-2">
        <h2>Bank Accounts</h2>
      </article>
      <BankAccountsAddButton />
      <div className="overflow-x-auto my-2">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Initial Value</th>
              <th>Notes</th>
              <th>Creation Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((bankAccount) => {
              return (
                <tr key={bankAccount.id}>
                  <td>{bankAccount.name}</td>
                  <td>{bankAccount.balance}</td>
                  <td>{bankAccount.notes}</td>
                  <td>
                    {formatDateToDisplay(new Date(bankAccount.createdAt))}
                  </td>
                  <td className="flex gap-2 justify-end">
                    <BankAccountsTableActions bankAccountId={bankAccount.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
