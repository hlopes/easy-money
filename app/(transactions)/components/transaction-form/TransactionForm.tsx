'use client';

import { useEffect } from 'react';
// import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type BankAccount,
  type Transaction,
  TransactionType,
} from '@prisma/client';
import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import type { TransactionFormData } from './schema';
import schema from './schema';

interface TransactionFormProps {
  isLoading: boolean;
  transaction?: Transaction;
  bankAccounts: BankAccount[];
  onClose(): void;
  onCreate(arg: TransactionFormData): void;
  onUpdate(arg: TransactionFormData & { id: string }): void;
}

export default function TransactionForm({
  isLoading = false,
  transaction,
  bankAccounts,
  onClose = () => {},
  onCreate,
  onUpdate,
}: TransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      value: 0,
      notes: '',
      type: TransactionType.INCOME,
      bankAccountId: bankAccounts.at(0)?.id ?? '',
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    if (transaction) {
      await onUpdate({ ...data, id: transaction.id });
    } else {
      await onCreate(data);
    }

    onClose();

    form.reset();
  };

  useEffect(() => {
    if (transaction) {
      form.reset({
        date: new Date(transaction.date),
        value: transaction.value,
        notes: transaction.notes ?? undefined,
        bankAccountId: transaction.bankAccountId,
        type: transaction.type,
      });
    }
  }, [transaction, form]);

  return bankAccounts.length ? (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bankAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bank account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bankAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem className="space-y-3">
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={TransactionType.INCOME} />
                      </FormControl>
                      <FormLabel className="font-normal">Income</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={TransactionType.EXPENSE} />
                      </FormControl>
                      <FormLabel className="font-normal">Expense</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Value"
                  disabled={isLoading}
                  {...field}
                />
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
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isLoading}>Save</Button>
        </div>
      </form>
    </Form>
  ) : (
    <h3 className="text-red-600 text-center">
      You need at least one create bank account first
    </h3>
  );
}
