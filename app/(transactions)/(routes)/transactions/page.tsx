import { currentUser } from '@clerk/nextjs';

import { getBankAccounts } from '@/app/(bankAccounts)/actions';
import { getCategories, getTransactions } from '@/app/(transactions)/actions';
import { TransactionsManager } from '@/app/(transactions)/components';

export default async function Transactions() {
  const user = await currentUser();

  const bankAccounts = await getBankAccounts(user?.id);

  const transactions = await getTransactions(user?.id);

  const categories = await getCategories();

  return (
    <TransactionsManager
      initialTransactions={transactions}
      initialBankAccounts={bankAccounts}
      initialCategories={categories}
    />
  );
}
