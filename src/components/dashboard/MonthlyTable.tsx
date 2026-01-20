import { MonthlyData, formatCurrency, formatNumber } from '@/lib/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MonthlyTableProps {
  data: MonthlyData[];
}

export function MonthlyTable({ data }: MonthlyTableProps) {
  const getTrendIcon = (current: number, previous: number | undefined) => {
    if (!previous) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (current > previous) return <TrendingUp className="h-4 w-4 text-success" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getGrowthPercentage = (current: number, previous: number | undefined) => {
    if (!previous) return null;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '400ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Détail mensuel
        </h3>
        <p className="text-sm text-muted-foreground">
          Performance par mois avec évolution
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Mois</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">CA</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Charges</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Résultat</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Locations</TableHead>
              <TableHead className="text-right text-muted-foreground font-semibold">Évolution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => {
              const prevRow = data[index - 1];
              const growth = getGrowthPercentage(row.profit, prevRow?.profit);
              
              return (
                <TableRow
                  key={row.month}
                  className="border-border transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{row.month}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(row.revenue)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(row.expenses)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-semibold',
                      row.profit > 0 ? 'text-success' : 'text-destructive'
                    )}
                  >
                    {formatCurrency(row.profit)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatNumber(row.rentals)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {getTrendIcon(row.profit, prevRow?.profit)}
                      {growth !== null && (
                        <span
                          className={cn(
                            'text-sm font-medium',
                            growth > 0
                              ? 'text-success'
                              : growth < 0
                              ? 'text-destructive'
                              : 'text-muted-foreground'
                          )}
                        >
                          {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
