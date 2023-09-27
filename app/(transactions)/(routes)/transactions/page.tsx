import { getBankAccounts } from '@/app/(bankAccounts)/actions';
import { getCategories, getTransactions } from '@/app/(transactions)/actions';
import { TransactionsManager } from '@/app/(transactions)/components';

export default async function Transactions() {
  const bankAccounts = await getBankAccounts();

  const transactions = await getTransactions();

  const categories = await getCategories();

  return (
    <TransactionsManager
      initialTransactions={transactions}
      initialBankAccounts={bankAccounts}
      initialCategories={categories}
    />
  );
}
