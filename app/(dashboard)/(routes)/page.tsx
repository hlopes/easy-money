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

  const totalsByMonth = await getTransactionTotalsByMonth();

  const totalIncomesByCategoryAndYear = await getTotalByCategoryYear(
    TransactionType.INCOME,
    user?.id
  );

  const totalExpensesByCategoryAndYear = await getTotalByCategoryYear(
    TransactionType.EXPENSE,
    user?.id
  );

  return (
    <>
      <PageTop title="Dashboard" />
      <h2 className="text-center mb-4">{format(new Date(), 'LLLL y')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <OverviewCards
          totalAccounts={totalAccounts}
          totalIncomes={totalIncomes}
          totalExpenses={totalExpenses}
          incomesDelta={incomesDelta}
          expensesDelta={expensesDelta}
        />
      </div>
      <h2 className="text-center mb-4">{format(new Date(), 'y')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Incomes</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CategoriesChart data={totalIncomesByCategoryAndYear} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CategoriesChart data={totalExpensesByCategoryAndYear} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>By month</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <YearChart data={totalsByMonth} />
        </CardContent>
      </Card>
    </>
  );
}
