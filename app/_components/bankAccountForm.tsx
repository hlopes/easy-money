'use client';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import cs from 'classnames';

let patternTwoDigitsAfterComma = /^\d+(\.\d{0,2})?$/;

const commonStringValidator = yup
  .number()
  .positive()
  .test(
    'is-decimal',
    'The amount should be a decimal with maximum two digits after comma',
    (val: any) => {
      if (val != undefined) {
        return patternTwoDigitsAfterComma.test(val);
      }

      return true;
    }
  )
  .min(1)
  .required();

const schema = yup.object({
  name: yup.string().required(),
  date: yup.date().required(),
  notes: yup.string().optional(),
  balance: commonStringValidator,
});

type BankAccountFormData = yup.InferType<typeof schema>;

export default function BankAccountForm() {
  const {
    register,
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

  const onSubmit = (data: BankAccountFormData) => console.log(data);

  return (
    <form
      method="dialog"
      className="flex flex-col gap-2 modal-box h-[500px]"
      onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-bold text-lg">New bank account</h3>
      <p className="mt-2 mb-6 text-xs">
        Press ESC key or click outside to close
      </p>
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
              placeholder="Value"
              className={cs('input input-bordered input-md w-full pr-20', {
                ['input-error']: !!errors.balance,
              })}
              step="0.01"
              {...register('balance')}
            />
            <p
              className={cs(
                'absolute top-0 right-0 bg-slate-600 leading-none h-full rounded-r-md p-4 border',
                {
                  ['border-error']: !!errors.balance,
                }
              )}>
              EUR(€)
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
          {...register('notes')}
        />
      </div>
      <button className="btn btn-sm md:self-end">Save</button>
    </form>
  );
}
