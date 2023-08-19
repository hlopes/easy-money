import { getBankAccounts } from '@/app/(bankAccounts)/actions/bankAccounts';

import { getTransactions } from '../actions/transactions';
import { TransactionsAddButton, TransactionsTable } from '../components';

export default async function Transactions() {
  const bankAccounts = await getBankAccounts();

  const transactions = await getTransactions();

  return (
    <main>
      <article className="prose my-2">
        <h2>Transactions</h2>
      </article>
      <TransactionsAddButton bankAccounts={bankAccounts} />
      <TransactionsTable transactions={transactions} />
    </main>
  );
}
