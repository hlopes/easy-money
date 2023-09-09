import serverClient from '@/lib/trpc/serverClient';

import { BankAccountManager } from '../../components';

export default async function BankAccounts() {
  const bankAccounts = await serverClient.getBankAccounts();

  return <BankAccountManager initialBankAccounts={bankAccounts} />;
}
