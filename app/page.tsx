import { getBankAccounts } from '@/services/bankAccounts';

export default async function Home() {
  const bankAccounts = await getBankAccounts();

  return (
    <main>
      <article className="prose my-2">
        <h2>Bank Accounts</h2>
      </article>
      <button className="btn">Add New</button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Initial Value</th>
              <th>Notes</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((bankAccount) => (
              <tr key={bankAccount.id}>
                <td>{bankAccount.name}</td>
                <td>{bankAccount.initial_value}</td>
                <td>{bankAccount.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
