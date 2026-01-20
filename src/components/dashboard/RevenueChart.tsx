import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MonthlyData, formatCurrency } from '@/lib/mockData';

interface RevenueChartProps {
  data: MonthlyData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = useMemo(
    () =>
      data.map((d) => ({
        name: d.monthShort,
        'Chiffre d\'affaires': d.revenue,
        'Charges': d.expenses,
        'Résultat': d.profit,
      })),
    [data]
  );

  return (
    <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '200ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Évolution financière
        </h3>
        <p className="text-sm text-muted-foreground">
          Comparaison mensuelle CA, charges et résultat
        </p>
      </div>
      
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(222, 47%, 20%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(4, 90%, 58%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(4, 90%, 58%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(162, 63%, 41%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(162, 63%, 41%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-lg)',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: 12 }}>
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="Chiffre d'affaires"
              stroke="hsl(222, 47%, 20%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="Charges"
              stroke="hsl(4, 90%, 58%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
            <Area
              type="monotone"
              dataKey="Résultat"
              stroke="hsl(162, 63%, 41%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
