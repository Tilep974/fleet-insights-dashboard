import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  agencies,
  vehicles,
  getAgencyData,
  calculateKPIs,
  expenseCategories,
  formatCurrency,
  formatNumber,
  getAgencyName,
} from '@/lib/mockData';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Euro, TrendingUp, Building2, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = [
  'hsl(222, 47%, 25%)',
  'hsl(162, 63%, 41%)',
  'hsl(38, 92%, 50%)',
  'hsl(4, 90%, 58%)',
  'hsl(280, 65%, 60%)',
];

export default function Analytics() {
  const [tab, setTab] = useState('global');

  // CA Global
  const globalData = useMemo(() => {
    const data = getAgencyData('all');
    const kpis = calculateKPIs(data);
    return { monthlyData: data, kpis };
  }, []);

  // CA par agence - comparaison mensuelle
  const agencyComparison = useMemo(() => {
    const realAgencies = agencies.filter((a) => a.id !== 'all');
    const months = getAgencyData('all').map((m) => m.monthShort);

    return months.map((month, i) => {
      const row: Record<string, string | number> = { month };
      realAgencies.forEach((agency) => {
        const data = getAgencyData(agency.id);
        row[agency.city] = data[i].revenue;
      });
      return row;
    });
  }, []);

  // CA par agence (total)
  const agencyTotals = useMemo(() => {
    return agencies
      .filter((a) => a.id !== 'all')
      .map((a) => {
        const kpis = calculateKPIs(getAgencyData(a.id));
        return { name: a.city, ca: kpis.totalRevenue, profit: kpis.netProfit, margin: kpis.profitMargin };
      });
  }, []);

  // CA par véhicule (catégorie)
  const vehicleByCategoryData = useMemo(() => {
    const map = new Map<string, { revenue: number; count: number; rentals: number }>();
    vehicles.forEach((v) => {
      const prev = map.get(v.category) || { revenue: 0, count: 0, rentals: 0 };
      map.set(v.category, {
        revenue: prev.revenue + v.totalRevenue,
        count: prev.count + 1,
        rentals: prev.rentals + v.totalRentals,
      });
    });
    return Array.from(map.entries()).map(([cat, data]) => ({
      name: cat,
      revenue: data.revenue,
      count: data.count,
      avgRevenue: Math.round(data.revenue / data.count),
    }));
  }, []);

  // CA par véhicule individuel
  const vehicleRevenues = useMemo(() => {
    return [...vehicles]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .map((v) => ({
        name: `${v.brand} ${v.model}`,
        plate: v.licensePlate,
        agency: getAgencyName(v.agencyId),
        revenue: v.totalRevenue,
        rentals: v.totalRentals,
        avgPerRental: Math.round(v.totalRevenue / v.totalRentals),
      }));
  }, []);

  // Expenses pie
  const expenseData = useMemo(() => {
    return expenseCategories.map((c, i) => ({
      name: c.category,
      value: c.amount,
      color: COLORS[i % COLORS.length],
    }));
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Analyses</h1>
          <p className="mt-1 text-muted-foreground">
            Chiffre d'affaires total, par agence et par véhicule
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="global" className="gap-2">
              <Euro className="h-4 w-4" /> CA Global
            </TabsTrigger>
            <TabsTrigger value="agency" className="gap-2">
              <Building2 className="h-4 w-4" /> Par agence
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="gap-2">
              <Car className="h-4 w-4" /> Par véhicule
            </TabsTrigger>
          </TabsList>

          {/* CA Global */}
          <TabsContent value="global">
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'CA Total', value: formatCurrency(globalData.kpis.totalRevenue), color: 'text-card-foreground' },
                { label: 'Charges', value: formatCurrency(globalData.kpis.totalExpenses), color: 'text-destructive' },
                { label: 'Résultat net', value: formatCurrency(globalData.kpis.netProfit), color: 'text-success' },
                { label: 'Marge', value: `${globalData.kpis.profitMargin.toFixed(1)}%`, color: 'text-card-foreground' },
              ].map((kpi, i) => (
                <div key={kpi.label} className="rounded-xl bg-card p-5 card-shadow animate-slide-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2 rounded-xl bg-card p-6 card-shadow">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Évolution mensuelle du CA</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={globalData.monthlyData.map((d) => ({ name: d.monthShort, CA: d.revenue, Charges: d.expenses, Résultat: d.profit }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), '']} />
                      <Legend />
                      <Line type="monotone" dataKey="CA" stroke="hsl(222, 47%, 20%)" strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Charges" stroke="hsl(4, 90%, 58%)" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Résultat" stroke="hsl(162, 63%, 41%)" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl bg-card p-6 card-shadow">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Répartition des charges</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={expenseData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value">
                        {expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--card))" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), '']} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CA par agence */}
          <TabsContent value="agency">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
              {agencyTotals.map((a, i) => (
                <div key={a.name} className="rounded-xl bg-card p-5 card-shadow animate-slide-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <p className="text-sm text-muted-foreground">{a.name}</p>
                  <p className="text-xl font-bold text-card-foreground">{formatCurrency(a.ca)}</p>
                  <p className="text-sm text-success font-medium">Marge: {a.margin.toFixed(1)}%</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-xl bg-card p-6 card-shadow">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">CA mensuel par agence</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={agencyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), '']} />
                      <Legend />
                      {agencies.filter((a) => a.id !== 'all').map((a, i) => (
                        <Line key={a.id} type="monotone" dataKey={a.city} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={{ r: 3 }} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl bg-card p-6 card-shadow">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Comparaison CA vs Résultat</h3>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agencyTotals}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), '']} />
                      <Legend />
                      <Bar dataKey="ca" name="CA" fill="hsl(222, 47%, 20%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="profit" name="Résultat" fill="hsl(162, 63%, 41%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CA par véhicule */}
          <TabsContent value="vehicle">
            <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-xl bg-card p-6 card-shadow">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">CA par catégorie de véhicule</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vehicleByCategoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), '']} />
                      <Legend />
                      <Bar dataKey="revenue" name="CA Total" fill="hsl(222, 47%, 25%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="avgRevenue" name="CA moyen/véhicule" fill="hsl(162, 63%, 41%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-xl bg-card p-6 card-shadow">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Répartition CA par catégorie</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vehicleByCategoryData.map((d, i) => ({ ...d, color: COLORS[i % COLORS.length] }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={95}
                        paddingAngle={2}
                        dataKey="revenue"
                        nameKey="name"
                      >
                        {vehicleByCategoryData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="hsl(var(--card))" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), '']} />
                      <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Table détaillée par véhicule */}
            <div className="rounded-xl bg-card p-6 card-shadow">
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">Détail CA par véhicule</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-semibold text-muted-foreground">#</th>
                      <th className="pb-3 text-left font-semibold text-muted-foreground">Véhicule</th>
                      <th className="pb-3 text-left font-semibold text-muted-foreground">Plaque</th>
                      <th className="pb-3 text-left font-semibold text-muted-foreground">Agence</th>
                      <th className="pb-3 text-right font-semibold text-muted-foreground">Locations</th>
                      <th className="pb-3 text-right font-semibold text-muted-foreground">CA Total</th>
                      <th className="pb-3 text-right font-semibold text-muted-foreground">CA moy./loc.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleRevenues.map((v, i) => (
                      <tr key={i} className="border-b border-border last:border-0 transition-colors hover:bg-muted/50">
                        <td className="py-3 text-muted-foreground">{i + 1}</td>
                        <td className="py-3 font-medium">{v.name}</td>
                        <td className="py-3 font-mono text-muted-foreground">{v.plate}</td>
                        <td className="py-3 text-muted-foreground">{v.agency}</td>
                        <td className="py-3 text-right">{v.rentals}</td>
                        <td className="py-3 text-right font-semibold">{formatCurrency(v.revenue)}</td>
                        <td className="py-3 text-right text-muted-foreground">{formatCurrency(v.avgPerRental)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
