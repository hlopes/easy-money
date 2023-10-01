'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import type { TotalSeries } from '@/app/(transactions)/types';

type YearChartProps = {
  data: TotalSeries[];
};

export default function YearChart({ data }: YearChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => `$${value}`}
        />
        <Bar
          dataKey="totalIncomes"
          fill="rgba(22,163,74, 0.7)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="totalExpenses"
          fill="rgba(220,38,38, 0.7)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
