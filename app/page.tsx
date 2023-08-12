import { LuEdit3, LuEraser, LuPlus } from 'react-icons/lu';

import { getBankAccounts } from '@/services/bankAccounts';

export default async function Home() {
  const bankAccounts = await getBankAccounts();

  return (
    <main>
      <article className="prose my-2">
        <h2>Bank Accounts</h2>
      </article>
      <div className="text-right">
        <button className="btn btn-sm">
          <LuPlus />
          Add New
        </button>
      </div>
      <div className="overflow-x-auto my-2">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Initial Value</th>
              <th>Notes</th>
              <th>Creation Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((bankAccount) => {
              return (
                <tr key={bankAccount.id}>
                  <td>{bankAccount.name}</td>
                  <td>{bankAccount.initialValue}</td>
                  <td>{bankAccount.notes}</td>
                  <td>{bankAccount.createdAt}</td>
                  <td className="flex gap-2 justify-end">
                    <button className="btn btn-sm btn-circle">
                      <LuEdit3 />
                    </button>
                    <button className="btn btn-sm btn-circle">
                      <LuEraser />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
