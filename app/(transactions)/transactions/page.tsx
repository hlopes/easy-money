import { getBankAccounts } from '@/app/(bankAccounts)/actions/bankAccounts';

import { TransactionsAddButton, TransactionsTable } from '../components';

export default async function Transactions() {
  const bankAccounts = await getBankAccounts();

  return (
    <main>
      <article className="prose my-2">
        <h2>Transactions</h2>
      </article>
      <TransactionsAddButton bankAccounts={bankAccounts} />
      <TransactionsTable bankAccounts={bankAccounts} />
    </main>
  );
}
