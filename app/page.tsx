import { getBankAccounts } from '@/app/_server-actions/bankAccounts';

import { BankAccountsAddButton, BankAccountsTable } from '@/app/_components';

export default async function Home() {
  const bankAccounts = await getBankAccounts();

  return (
    <main>
      <article className="prose my-2">
        <h2>Bank Accounts</h2>
      </article>
      <BankAccountsAddButton />
      <div className="overflow-x-auto my-2">
        <BankAccountsTable bankAccounts={bankAccounts} />
      </div>
    </main>
  );
}
