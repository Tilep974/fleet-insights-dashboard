import { useMemo } from 'react';
import { Building2, Car, Euro, TrendingUp, MapPin, Phone, User } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  agencies,
  getAgencyData,
  calculateKPIs,
  getVehiclesByAgency,
  formatCurrency,
  formatNumber,
} from '@/lib/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

export default function Agencies() {
  const agenciesData = useMemo(() => {
    return agencies
      .filter((a) => a.id !== 'all')
      .map((agency) => {
        const data = getAgencyData(agency.id);
        const kpis = calculateKPIs(data);
        const vehicleCount = getVehiclesByAgency(agency.id).length;
        return { ...agency, kpis, vehicleCount, monthlyData: data };
      });
  }, []);

  const chartData = useMemo(
    () =>
      agenciesData.map((a) => ({
        name: a.city,
        'Chiffre d\'affaires': a.kpis.totalRevenue,
        'Résultat': a.kpis.netProfit,
      })),
    [agenciesData]
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Agences</h1>
          <p className="mt-1 text-muted-foreground">
            Performance et détails par agence
          </p>
        </div>

        {/* Chart comparatif */}
        <div className="mb-8 rounded-xl bg-card p-6 card-shadow animate-slide-in-up">
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">
            Comparaison du CA par agence
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Bar dataKey="Chiffre d'affaires" fill="hsl(222, 47%, 20%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Résultat" fill="hsl(162, 63%, 41%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agency Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {agenciesData.map((agency, index) => (
            <div
              key={agency.id}
              className="rounded-xl bg-card p-6 card-shadow transition-all duration-300 hover:card-shadow-lg animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">{agency.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {agency.city}
                  </div>
                </div>
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
              </div>

              {agency.address && (
                <p className="mb-2 text-xs text-muted-foreground">{agency.address}</p>
              )}

              <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                {agency.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" /> {agency.phone}
                  </span>
                )}
                {agency.manager && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {agency.manager}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-lg font-bold text-card-foreground">
                    {formatCurrency(agency.kpis.totalRevenue)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Résultat net</p>
                  <p className="text-lg font-bold text-success">
                    {formatCurrency(agency.kpis.netProfit)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Véhicules</p>
                  <p className="flex items-center gap-1 text-lg font-bold text-card-foreground">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    {agency.vehicleCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Locations</p>
                  <p className="text-lg font-bold text-card-foreground">
                    {formatNumber(agency.kpis.totalRentals)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">
                  Marge: {agency.kpis.profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
