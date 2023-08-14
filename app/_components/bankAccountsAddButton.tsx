'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import DatePicker from 'react-datepicker';

const globalForModal = window as unknown as {
  newBankAccountModal: { showModal: () => void } | undefined;
};

export default function BankAccountsAddButton() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <button
        className="btn btn-sm"
        onClick={() => globalForModal.newBankAccountModal?.showModal()}>
        <LuPlus />
        Add New
      </button>
      <dialog
        id="newBankAccountModal"
        className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="flex flex-col gap-4 modal-box h-[500px]">
          <h3 className="font-bold text-lg">New bank account</h3>
          <p className="mt-2 mb-6 text-xs">
            Press ESC key or click outside to close
          </p>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered input-md w-full"
          />
          <DatePicker
            className="input input-bordered input-md w-full"
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
          />
          <div className="relative w-60">
            <input
              type="number"
              placeholder="Value"
              className="input input-bordered input-md w-full pr-20"
            />
            <p className="absolute top-0 right-0 bg-slate-600 leading-none h-full rounded-r-md p-4">
              EUR(€)
            </p>
          </div>
          <textarea
            className="textarea w-full textarea-bordered"
            placeholder="Notes"></textarea>
          <button className="btn btn-sm md:self-end">Save</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
