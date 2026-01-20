import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  delay?: number;
}

const variantStyles = {
  default: {
    icon: 'bg-primary/10 text-primary',
    trend: {
      positive: 'text-success',
      negative: 'text-destructive',
    },
  },
  success: {
    icon: 'bg-success/10 text-success',
    trend: {
      positive: 'text-success',
      negative: 'text-destructive',
    },
  },
  warning: {
    icon: 'bg-warning/10 text-warning',
    trend: {
      positive: 'text-success',
      negative: 'text-destructive',
    },
  },
  destructive: {
    icon: 'bg-destructive/10 text-destructive',
    trend: {
      positive: 'text-success',
      negative: 'text-destructive',
    },
  },
};

export function KPICard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  variant = 'default',
  delay = 0,
}: KPICardProps) {
  const styles = variantStyles[variant];
  const isPositive = trend !== undefined && trend >= 0;
  
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl bg-card p-6 card-shadow transition-all duration-300 hover:card-shadow-lg hover:-translate-y-0.5',
        'animate-slide-in-up'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-card-foreground">
            {value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive ? (
                <TrendingUp className={cn('h-4 w-4', styles.trend.positive)} />
              ) : (
                <TrendingDown className={cn('h-4 w-4', styles.trend.negative)} />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive ? styles.trend.positive : styles.trend.negative
                )}
              >
                {isPositive ? '+' : ''}{trend.toFixed(1)}%
              </span>
              {trendLabel && (
                <span className="text-sm text-muted-foreground">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className={cn('rounded-xl p-3', styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
