import serverClient from '@/lib/trpc/serverClient';

import { TransactionsManager } from '../../components';

export default async function Transactions() {
  const bankAccounts = await serverClient.getBankAccounts();

  const transactions = await serverClient.getTransactions();

  return (
    <TransactionsManager
      initialTransactions={transactions}
      initialBankAccounts={bankAccounts}
    />
  );
}
