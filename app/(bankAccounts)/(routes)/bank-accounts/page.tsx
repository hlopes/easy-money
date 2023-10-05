import { currentUser } from '@clerk/nextjs';

import getBankAccounts from '@/app/(bankAccounts)/actions/getBankAccounts';
import { BankAccountManager } from '@/app/(bankAccounts)/components';

export default async function BankAccounts() {
  const user = await currentUser();

  const bankAccounts = await getBankAccounts(user?.id);

  return <BankAccountManager initialBankAccounts={bankAccounts} />;
}
