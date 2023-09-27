import getBankAccounts from '@/app/(bankAccounts)/actions/getBankAccounts';
import { BankAccountManager } from '@/app/(bankAccounts)/components';

export default async function BankAccounts() {
  const bankAccounts = await getBankAccounts();

  return <BankAccountManager initialBankAccounts={bankAccounts} />;
}
