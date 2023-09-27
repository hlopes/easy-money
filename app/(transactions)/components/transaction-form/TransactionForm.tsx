'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '@prisma/client';
import {
  type BankAccount,
  type Transaction,
  TransactionType,
} from '@prisma/client';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from '@radix-ui/react-icons';

import getCategories from '@/app/(transactions)/actions/getCategories';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
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
import { ScrollArea } from '@/components/ui/scroll-area';
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
  transaction?: Transaction;
  bankAccounts: BankAccount[];
  categories: Category[];
  onAdd(arg: TransactionFormData): void;
  onUpdate(arg: string, arg2: TransactionFormData): void;
  onClose(): void;
}

export default function TransactionForm({
  transaction,
  bankAccounts,
  categories,
  onAdd,
  onUpdate,
  onClose = () => {},
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
      await onUpdate(transaction.id, data);
    } else {
      await onAdd(data);
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
        <ScrollArea className="w-full h-96">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value
                          ? categories.find(
                              (category) => category.name === field.value
                            )?.name
                          : 'Select category'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.name}
                            onSelect={() => {
                              form.setValue('category', category.name);
                            }}>
                            {category.name}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                category.name === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the category that will be used for transactions
                  aggregation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankAccountId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Account</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
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
                        {value ? (
                          format(value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                  <Input type="number" placeholder="Value" {...field} />
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
        </ScrollArea>
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  ) : (
    <h3 className="text-red-600 text-center">
      You need at least one create bank account first
    </h3>
  );
}
