import { getBankAccounts } from '@/app/(bankAccounts)/actions/bankAccounts';

import { TransactionsAddButton, TransactionsTable } from '../components';

export default async function Transactions() {
  const bankAccounts = await getBankAccounts();

  return (
    <main>
      <section className="prose my-2 flex justify-between">
        <h2>Transactions</h2>
        <TransactionsAddButton bankAccounts={bankAccounts} />
      </section>
      <TransactionsTable bankAccounts={bankAccounts} />
    </main>
  );
}
