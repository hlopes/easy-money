'use client';

import { useEffect, useRef, useTransition } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import cs from 'classnames';
import type * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { BankAccount, Transaction } from '@prisma/client';

import {
  createTransaction,
  updateTransaction,
} from '../../actions/transactions';

import schema from './schema';

type TransactionFormData = yup.InferType<typeof schema>;

interface TransactionFormProps {
  isOpen: boolean;
  onClose(): void;
  transaction?: Transaction;
  bankAccounts?: BankAccount[];
}

export default function TransactionForm({
  isOpen = false,
  onClose = () => {},
  transaction,
  bankAccounts,
}: TransactionFormProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isPendingUpsertTransaction, startUpsertTransaction] = useTransition();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(),
      value: 0,
      type: 'income',
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    startUpsertTransaction(async () => {
      if (!transaction) {
        const createdTransaction = await createTransaction(data);

        if (!!createdTransaction.id) {
          onClose();

          reset();
        }

        return;
      }

      const updatedTransaction = await updateTransaction({
        id: transaction.id,
        ...data,
      });

      if (!!updatedTransaction.id) {
        onClose();

        reset();
      }
    });
  };

  useEffect(() => {
    if (transaction) {
      reset({
        date: new Date(transaction.date),
        value: transaction.value,
        notes: transaction.notes ?? undefined,
      });
    }
  }, [transaction, reset]);

  useEffect(() => {
    if (modalRef?.current) {
      if (isOpen) {
        modalRef.current?.showModal();
      } else {
        modalRef.current?.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      id="transactionFormModal"
      className="modal modal-bottom sm:modal-middle">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        method="dialog"
        className="flex flex-col gap-2 modal-box h-[550px]">
        <h3 className="font-bold text-lg">New transaction</h3>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Bank Account</span>
          </label>
          <select
            className="select select-bordered"
            {...register('bankAccountId')}
            disabled={!bankAccounts?.length || isPendingUpsertTransaction}>
            {bankAccounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select className="select select-bordered" {...register('type')}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div>
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ReactDatePicker
                  className="input input-bordered input-md w-full placeholder:text-neutral"
                  selected={value}
                  onChange={onChange}
                  dateFormat="dd-MM-yyyy"
                  disabled={isPendingUpsertTransaction}
                />
              )}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Value</span>
            </label>
            <div className="relative w-60">
              <input
                type="number"
                placeholder="value of the transaction"
                className={cs(
                  'input input-bordered input-md w-full pr-20 placeholder:text-neutral',
                  {
                    ['input-error']: !!errors.value,
                  }
                )}
                step="0.01"
                disabled={isPendingUpsertTransaction}
                {...register('value')}
              />
              <p
                className={cs(
                  'absolute top-0 right-0 bg-slate-600 leading-none h-full rounded-r-md border overflow-hidden',
                  {
                    ['border-error']: !!errors.value,
                  }
                )}>
                <Image src="/eu.svg" alt="euro flag" width="45" height="45" />
              </p>
            </div>
          </div>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <textarea
            className={cs(
              'textarea w-full textarea-bordered placeholder:text-neutral',
              {
                ['input-error']: !!errors.notes,
              }
            )}
            placeholder="transaction notes"
            maxLength={500}
            disabled={isPendingUpsertTransaction}
            {...register('notes')}
          />
        </div>
        <button
          className={cs('btn btn-sm md:self-end', {
            ['btn-disabled']: isPendingUpsertTransaction,
          })}>
          Save
        </button>
      </form>
      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => onClose()}>
        <button>close</button>
      </form>
    </dialog>
  );
}
