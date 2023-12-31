'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { CalendarIcon } from '@radix-ui/react-icons';

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
import type { Category } from '@/prisma/client';
import {
  type BankAccount,
  type Transaction,
  TransactionType,
} from '@/prisma/client';

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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      value: 0,
      notes: '',
      type: TransactionType.INCOME,
      bankAccountId: transaction?.bankAccountId ?? bankAccounts.at(0)?.id ?? '',
      categoryId: transaction?.categoryId ?? categories.at(0)?.id ?? '',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value
                        ? categories.find(
                            (category) => category.id === field.value
                          )?.name
                        : 'Select category'}
                      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandEmpty>No category found</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-60">
                        {categories.map((category) => (
                          <CommandItem
                            value={category.name}
                            key={category.name}
                            onSelect={() => {
                              form.setValue('categoryId', category.id);

                              setIsCategoryOpen(false);
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
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div className="flex justify-between w-full">
          {/* Type */}
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
          {/* Balance */}
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
        </div>
        {/* BankAccount */}
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
            </FormItem>
          )}
        />
        {/* Date */}
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
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
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
        {/* Notes */}
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
  ) : (
    <h3 className="text-center text-red-600">
      You need at least one create bank account first
    </h3>
  );
}
