import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { ExpenseCategory, formatCurrency } from '@/lib/mockData';

interface ExpensesChartProps {
  data: ExpenseCategory[];
}

const COLORS = [
  'hsl(222, 47%, 25%)',
  'hsl(162, 63%, 41%)',
  'hsl(38, 92%, 50%)',
  'hsl(4, 90%, 58%)',
  'hsl(280, 65%, 60%)',
  'hsl(162, 63%, 55%)',
  'hsl(215, 16%, 55%)',
];

export function ExpensesChart({ data }: ExpensesChartProps) {
  const chartData = useMemo(
    () =>
      data.map((d, index) => ({
        name: d.category,
        value: d.amount,
        percentage: d.percentage,
        color: COLORS[index % COLORS.length],
      })),
    [data]
  );

  const totalExpenses = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '300ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Répartition des charges
        </h3>
        <p className="text-sm text-muted-foreground">
          Total: {formatCurrency(totalExpenses)}
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
              }}
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name,
              ]}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-sm text-muted-foreground">
                  {value} ({entry.payload.percentage.toFixed(1)}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
