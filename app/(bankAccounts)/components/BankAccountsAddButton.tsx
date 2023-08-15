'use client';

import { LuPlus } from 'react-icons/lu';

import BankAccountForm from './bankAccountForm';

export default function BankAccountsAddButton() {
  const globalForModal =
    typeof window === 'undefined'
      ? null
      : (window as unknown as {
          newBankAccountModal: HTMLDialogElement | undefined;
        });

  return (
    <>
      <button
        className="btn btn-sm"
        onClick={() => globalForModal?.newBankAccountModal?.showModal()}>
        <LuPlus />
        Add New
      </button>
      <dialog
        id="newBankAccountModal"
        className="modal modal-bottom sm:modal-middle">
        <BankAccountForm
          onCloseModal={() => globalForModal?.newBankAccountModal?.close()}
        />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
