export default function TransactionsFilter() {
  return (
    <>
      <p className="text-sm">Filter</p>
      <div className="border border-slate-600 rounded-lg p-2 m-2">
        <div className="flex flex-col gap-2">
          <div className="form-control flex-row items-center">
            <input type="checkbox" checked className="checkbox checkbox-sm" />
            <label className="label text-xs">Income</label>
          </div>
          <div className="form-control flex-row items-center">
            <input type="checkbox" checked className="checkbox checkbox-sm" />
            <label className="label text-xs">Expense</label>
          </div>
        </div>
      </div>
    </>
  );
}
