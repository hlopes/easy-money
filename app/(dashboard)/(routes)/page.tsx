import { LuEuro, LuMoveDown, LuMoveUp } from 'react-icons/lu';
import { format } from 'date-fns';
import { TransactionType } from '@prisma/client';

import getTotalBankAccounts from '@/app/(bankAccounts)/actions/getTotalBankAccounts';
import getTotalByTransactionType from '@/app/(transactions)/actions/getTotalByTransactionType';
import getTransactionTotalsByMonth from '@/app/(transactions)/actions/getTransactionTotalsByMonth';
import PageTop from '@/components/PageTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import YearChart from '../components/YearChart';

export default async function Dashboard() {
  const totalAccounts = await getTotalBankAccounts();

  const { totalCurrentMonth: totalExpenses, delta: expensesDelta } =
    await getTotalByTransactionType(TransactionType.EXPENSE);

  const { totalCurrentMonth: totalIncomes, delta: incomesDelta } =
    await getTotalByTransactionType(TransactionType.INCOME);

  const totalsByMonth = await getTransactionTotalsByMonth();

  return (
    <>
      <PageTop title="Dashboard" />
      <h2 className="text-center mb-4">{format(new Date(), 'LLLL y')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accounts
            </CardTitle>
            <LuEuro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccounts}€</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incomes</CardTitle>
            <LuMoveUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalIncomes}€
            </div>
            {!Number.isNaN(incomesDelta) ? (
              <p className="text-xs text-muted-foreground">
                {incomesDelta.toFixed()}% from last month
              </p>
            ) : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <LuMoveDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalExpenses}€
            </div>
            {!Number.isNaN(expensesDelta) ? (
              <p className="text-xs text-muted-foreground">
                {expensesDelta.toFixed()} % from last month
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>{format(new Date(), 'y')}</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <YearChart data={totalsByMonth} />
        </CardContent>
      </Card>
    </>
  );
}
