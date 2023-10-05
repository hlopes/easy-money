import { format } from 'date-fns';
import { currentUser } from '@clerk/nextjs';

import getTotalBankAccounts from '@/app/(bankAccounts)/actions/getTotalBankAccounts';
import getTotalByTransactionType from '@/app/(transactions)/actions/getTotalByTransactionType';
import getTransactionTotalsByMonth from '@/app/(transactions)/actions/getTransactionTotalsByMonth';
import PageTop from '@/components/PageTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionType } from '@/prisma/client';

import { OverviewCards, YearChart } from '../components';

export default async function Dashboard() {
  const user = await currentUser();

  const totalAccounts = await getTotalBankAccounts(user?.id);

  const { totalCurrentMonth: totalExpenses, delta: expensesDelta } =
    await getTotalByTransactionType(TransactionType.EXPENSE, user?.id);

  const { totalCurrentMonth: totalIncomes, delta: incomesDelta } =
    await getTotalByTransactionType(TransactionType.INCOME, user?.id);

  const totalsByMonth = await getTransactionTotalsByMonth();

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
