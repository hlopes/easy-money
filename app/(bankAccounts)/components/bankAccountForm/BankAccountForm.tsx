'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { BankAccount } from '@prisma/client';
import cs from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useTransition } from 'react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import schema from './schema';
import {
  createBankAccount,
  updateBankAccount,
} from '../../actions/bankAccounts';

type BankAccountFormData = yup.InferType<typeof schema>;

interface BankAccountFormProps {
  isOpen: boolean;
  onClose(): void;
  bankAccount?: BankAccount;
}

export default function BankAccountForm({
  isOpen = false,
  onClose = () => {},
  bankAccount,
}: BankAccountFormProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      date: new Date(),
      balance: 0,
    },
  });

  const onSubmit = async (data: BankAccountFormData) => {
    startTransition(async () => {
      if (!bankAccount) {
        const createdAccount = await createBankAccount(data);

        if (!!createdAccount.id) {
          onClose();

          reset();
        }

        return;
      }

      const updatedAccount = await updateBankAccount({
        id: bankAccount.id,
        ...data,
      });

      if (!!updatedAccount.id) {
        onClose();

        reset();
      }
    });
  };

  useEffect(() => {
    if (bankAccount) {
      reset({
        name: bankAccount.name,
        date: new Date(bankAccount.date),
        balance: bankAccount.balance,
        notes: bankAccount.notes ?? undefined,
      });
    }
  }, [bankAccount, reset]);

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
      id="bankAccountFormModal"
      className="modal modal-bottom sm:modal-middle">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        method="dialog"
        className="flex flex-col gap-2 modal-box h-[500px]">
        <h3 className="font-bold text-lg">New bank account</h3>
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Bank account name"
            className={cs(
              'input input-bordered input-md w-full placeholder:text-neutral',
              {
                ['input-error']: !!errors.name,
              }
            )}
            disabled={isPending}
            maxLength={100}
            {...register('name')}
          />
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
                <DatePicker
                  className="input input-bordered input-md w-full placeholder:text-neutral"
                  selected={value}
                  onChange={onChange}
                  dateFormat="dd-MM-yyyy"
                  disabled={isPending}
                />
              )}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Balance</span>
            </label>
            <div className="relative w-60">
              <input
                type="number"
                placeholder="Initial balance"
                className={cs(
                  'input input-bordered input-md w-full pr-20 placeholder:text-neutral',
                  {
                    ['input-error']: !!errors.balance,
                  }
                )}
                step="0.01"
                disabled={isPending}
                {...register('balance')}
              />
              <p
                className={cs(
                  'absolute top-0 right-0 bg-slate-600 leading-none h-full rounded-r-md border overflow-hidden',
                  {
                    ['border-error']: !!errors.balance,
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
                ['input-error']: !!errors.name,
              }
            )}
            placeholder="Bank account notes"
            maxLength={500}
            disabled={isPending}
            {...register('notes')}
          />
        </div>
        <button
          className={cs('btn btn-sm md:self-end', {
            ['btn-disabled']: isPending,
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
