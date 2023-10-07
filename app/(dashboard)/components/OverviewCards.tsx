import { LuEuro, LuMoveDown, LuMoveUp } from 'react-icons/lu';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type OverviewCardsProps = {
  totalAccounts: number;
  totalIncomes: number;
  totalExpenses: number;
  incomesDelta: number;
  expensesDelta: number;
};

export default function OverviewCards({
  totalAccounts,
  totalIncomes,
  totalExpenses,
  incomesDelta,
  expensesDelta,
}: OverviewCardsProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
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
              {Number.isFinite(incomesDelta) ? incomesDelta.toFixed() : 100}%
              from last month
            </p>
          ) : null}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <LuMoveDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {totalExpenses}€
          </div>
          {!Number.isNaN(expensesDelta) ? (
            <p className="text-xs text-muted-foreground">
              {Number.isFinite(expensesDelta) ? incomesDelta.toFixed() : 100}%
              from last month
            </p>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
