import { BankAccountsAddButton, BankAccountsTable } from './components';

export default async function Home() {
  return (
    <main>
      <section className="prose my-2 flex justify-between">
        <h2>Bank Accounts</h2>
        <BankAccountsAddButton />
      </section>
      <div className="overflow-x-auto my-2">
        <BankAccountsTable />
      </div>
    </main>
  );
}
