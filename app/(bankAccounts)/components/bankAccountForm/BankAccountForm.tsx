'use client';

import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import cs from 'classnames';

import { createBankAccount } from '../../server-actions/bankAccounts';

import schema from './schema';

type BankAccountFormData = yup.InferType<typeof schema>;

interface BankAccountFormProps {
  onCloseModal(): void;
}

export default function BankAccountForm({
  onCloseModal,
}: BankAccountFormProps) {
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
    const newAccount = await createBankAccount(data);

    if (!!newAccount.id) {
      onCloseModal();
      reset();
    }
  };

  return (
    <form
      autoComplete="off"
      method="dialog"
      className="flex flex-col gap-2 modal-box h-[500px]"
      onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-lg">New bank account</h3>
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Bank account name"
          className={cs('input input-bordered input-md w-full', {
            ['input-error']: !!errors.name,
          })}
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
                className="input input-bordered input-md w-full"
                selected={value}
                onChange={onChange}
                dateFormat="dd-MM-yyyy"
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
              className={cs('input input-bordered input-md w-full pr-20', {
                ['input-error']: !!errors.balance,
              })}
              step="0.01"
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
          className={cs('textarea w-full textarea-bordered', {
            ['input-error']: !!errors.name,
          })}
          placeholder="Bank account notes"
          maxLength={500}
          {...register('notes')}
        />
      </div>
      <button className="btn btn-sm md:self-end">Save</button>
    </form>
  );
}
