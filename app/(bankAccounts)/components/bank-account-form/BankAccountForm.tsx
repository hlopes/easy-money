import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { BankAccount } from '@/prisma/client';

import type { BankAccountFormData } from './schema';
import schema from './schema';

type BankAccountFormProps = {
  bankAccount?: BankAccount;
  onAdd(arg: BankAccountFormData): Promise<void>;
  onUpdate(arg: string, arg2: BankAccountFormData): Promise<void>;
  onClose(): void;
};

export default function BankAccountForm({
  bankAccount,
  onAdd,
  onUpdate,
  onClose = () => {},
}: BankAccountFormProps) {
  const form = useForm<BankAccountFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      date: new Date(),
      balance: 0,
    },
  });

  const onSubmit = async (data: BankAccountFormData) => {
    if (bankAccount) {
      await onUpdate(bankAccount.id, data);
    } else {
      await onAdd(data);
    }

    onClose();

    form.reset();
  };

  useEffect(() => {
    if (bankAccount) {
      form.reset({
        name: bankAccount.name,
        date: new Date(bankAccount.date),
        balance: bankAccount.balance,
        notes: bankAccount.notes ?? undefined,
      });
    }
  }, [bankAccount, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Bank account name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !value && 'text-muted-foreground'
                      )}>
                      {value ? format(value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Initial balance" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Bank Account notes"
                  maxLength={500}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button aria-disabled={form.formState.isSubmitting}>Save</Button>
        </div>
      </form>
    </Form>
  );
}
