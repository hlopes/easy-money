import { LuArrowLeftCircle } from 'react-icons/lu';
import { format } from 'date-fns';
import { currentUser } from '@clerk/nextjs';

import { getTotalBankAccounts } from '@/app/(bankAccounts)/actions';
import {
  getTotalByCategoryYear,
  getTotalByTransactionType,
  getTransactionTotalsByMonth,
} from '@/app/(transactions)/actions';
import PageTop from '@/components/PageTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionType } from '@/prisma/client';

import { OverviewCards, YearChart } from '../components';
import CategoriesChart from '../components/CategoriesChart';

export default async function Dashboard() {
  const user = await currentUser();

  const totalAccounts = await getTotalBankAccounts(user?.id);

  const { totalCurrentMonth: totalExpenses, delta: expensesDelta } =
    await getTotalByTransactionType(TransactionType.EXPENSE, user?.id);

  const { totalCurrentMonth: totalIncomes, delta: incomesDelta } =
    await getTotalByTransactionType(TransactionType.INCOME, user?.id);

  const totalsByMonth = await getTransactionTotalsByMonth(user?.id);

  const totalIncomesByCategoryAndYear = await getTotalByCategoryYear(
    TransactionType.INCOME,
    user?.id
  );

  const totalExpensesByCategoryAndYear = await getTotalByCategoryYear(
    TransactionType.EXPENSE,
    user?.id
  );

  if (totalAccounts === 0 && totalIncomes === 0 && totalExpenses === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100%-64px)] space-y-6">
        <p className="text-2xl font-light text-center">
          Please add some back account and transactions information using the
          side navigation bar{' '}
        </p>
        <LuArrowLeftCircle className="w-8 h-8 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <PageTop title="Dashboard" />
      <h2 className="mb-4 text-center">{format(new Date(), 'LLLL y')}</h2>
      <div className="grid gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
        <OverviewCards
          totalAccounts={totalAccounts}
          totalIncomes={totalIncomes}
          totalExpenses={totalExpenses}
          incomesDelta={incomesDelta}
          expensesDelta={expensesDelta}
        />
      </div>
      <h2 className="mb-4 text-center">{format(new Date(), 'y')}</h2>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {!totalIncomesByCategoryAndYear.length ? null : (
          <Card>
            <CardHeader>
              <CardTitle>Incomes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <CategoriesChart data={totalIncomesByCategoryAndYear} />
            </CardContent>
          </Card>
        )}
        {!totalExpensesByCategoryAndYear.length ? null : (
          <Card>
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <CategoriesChart data={totalExpensesByCategoryAndYear} />
            </CardContent>
          </Card>
        )}
      </div>
      {!totalsByMonth.length ? null : (
        <Card>
          <CardHeader>
            <CardTitle>By month</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <YearChart data={totalsByMonth} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
