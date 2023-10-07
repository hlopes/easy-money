'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

type RenderCustomLabelArgs = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderCustomLabelArgs) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);

  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fontSize={12}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type CategoriesChartProps = {
  data: { name: string; value: number }[];
};

export default function CategoriesChart({ data }: CategoriesChartProps) {
  return (
    <ResponsiveContainer width={'100%'} height={200}>
      <PieChart>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          //   fill="#8884d8"
          dataKey="value">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
