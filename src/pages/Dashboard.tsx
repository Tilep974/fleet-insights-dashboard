import { useState, useMemo } from 'react';
import {
  Euro,
  TrendingDown,
  TrendingUp,
  Percent,
  Car,
  Users,
  Gauge,
  ArrowUpRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { ExpensesChart } from '@/components/dashboard/ExpensesChart';
import { MonthlyTable } from '@/components/dashboard/MonthlyTable';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import {
  Agency,
  agencies,
  getAgencyData,
  calculateKPIs,
  expenseCategories,
  formatCurrency,
  formatNumber,
} from '@/lib/mockData';

export default function Dashboard() {
  const [selectedAgency, setSelectedAgency] = useState<Agency>(agencies[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const monthlyData = useMemo(
    () => getAgencyData(selectedAgency.id),
    [selectedAgency.id]
  );

  const kpis = useMemo(() => calculateKPIs(monthlyData), [monthlyData]);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Tableau de bord
            </h1>
            <p className="mt-1 text-muted-foreground">
              Vue d'ensemble de la performance financière
            </p>
          </div>
          <DashboardFilters
            selectedAgency={selectedAgency}
            onAgencyChange={setSelectedAgency}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Chiffre d'affaires"
            value={formatCurrency(kpis.totalRevenue)}
            trend={kpis.revenueGrowth}
            trendLabel="vs période préc."
            icon={Euro}
            variant="default"
            delay={0}
          />
          <KPICard
            title="Charges totales"
            value={formatCurrency(kpis.totalExpenses)}
            trend={kpis.expenseGrowth}
            trendLabel="vs période préc."
            icon={TrendingDown}
            variant="destructive"
            delay={50}
          />
          <KPICard
            title="Résultat net"
            value={formatCurrency(kpis.netProfit)}
            trend={kpis.profitMargin}
            trendLabel="de marge"
            icon={TrendingUp}
            variant="success"
            delay={100}
          />
          <KPICard
            title="Taux d'utilisation"
            value={`${kpis.fleetUtilization.toFixed(1)}%`}
            icon={Gauge}
            variant="warning"
            delay={150}
          />
        </div>

        {/* Secondary KPIs */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group flex items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-lg animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <div className="rounded-xl bg-primary/10 p-3">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Locations totales</p>
              <p className="text-2xl font-bold text-card-foreground">
                {formatNumber(kpis.totalRentals)}
              </p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-lg animate-slide-in-up" style={{ animationDelay: '150ms' }}>
            <div className="rounded-xl bg-accent/10 p-3">
              <Euro className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CA moyen / location</p>
              <p className="text-2xl font-bold text-card-foreground">
                {formatCurrency(kpis.avgRevenuePerRental)}
              </p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 rounded-xl bg-card p-5 card-shadow transition-all duration-300 hover:card-shadow-lg animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <div className="rounded-xl bg-success/10 p-3">
              <Percent className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Marge bénéficiaire</p>
              <p className="text-2xl font-bold text-card-foreground">
                {kpis.profitMargin.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart data={monthlyData} />
          </div>
          <div>
            <ExpensesChart data={expenseCategories} />
          </div>
        </div>

        {/* Monthly Table */}
        <MonthlyTable data={monthlyData} />
      </div>
    </DashboardLayout>
  );
}
