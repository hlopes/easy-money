import { BankAccountsAddButton, BankAccountsTable } from './components';

export default async function Home() {
  return (
    <main>
      <article className="prose my-2">
        <h2>Bank Accounts</h2>
      </article>
      <BankAccountsAddButton />
      <div className="overflow-x-auto my-2">
        <BankAccountsTable />
      </div>
    </main>
  );
}
