import { useState, useMemo } from 'react';
import { Car, Euro, Search, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  vehicles,
  agencies,
  vehicleStatusLabels,
  vehicleStatusColors,
  getAgencyName,
  formatCurrency,
  formatNumber,
} from '@/lib/mockData';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Fleet() {
  const [search, setSearch] = useState('');
  const [agencyFilter, setAgencyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        search === '' ||
        `${v.brand} ${v.model} ${v.licensePlate}`.toLowerCase().includes(search.toLowerCase());
      const matchAgency = agencyFilter === 'all' || v.agencyId === agencyFilter;
      const matchStatus = statusFilter === 'all' || v.status === statusFilter;
      return matchSearch && matchAgency && matchStatus;
    });
  }, [search, agencyFilter, statusFilter]);

  // Top 10 véhicules par CA
  const topVehiclesByRevenue = useMemo(() => {
    return [...vehicles]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10)
      .map((v) => ({
        name: `${v.brand} ${v.model}`,
        revenue: v.totalRevenue,
      }));
  }, []);

  // KPIs flotte
  const fleetKpis = useMemo(() => {
    const total = vehicles.length;
    const available = vehicles.filter((v) => v.status === 'available').length;
    const rented = vehicles.filter((v) => v.status === 'rented').length;
    const maintenance = vehicles.filter((v) => v.status === 'maintenance').length;
    const totalRevenue = vehicles.reduce((sum, v) => sum + v.totalRevenue, 0);
    return { total, available, rented, maintenance, totalRevenue };
  }, []);

  const agencyRevenue = useMemo(() => {
    const map = new Map<string, number>();
    vehicles.forEach((v) => {
      map.set(v.agencyId, (map.get(v.agencyId) || 0) + v.totalRevenue);
    });
    return Array.from(map.entries()).map(([id, revenue]) => ({
      name: getAgencyName(id),
      revenue,
    }));
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Flotte</h1>
          <p className="mt-1 text-muted-foreground">
            Gestion et suivi des véhicules
          </p>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total véhicules', value: fleetKpis.total, color: 'text-card-foreground' },
            { label: 'Disponibles', value: fleetKpis.available, color: 'text-success' },
            { label: 'En location', value: fleetKpis.rented, color: 'text-primary' },
            { label: 'CA total flotte', value: formatCurrency(fleetKpis.totalRevenue), color: 'text-card-foreground' },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="rounded-xl bg-card p-5 card-shadow animate-slide-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className={cn('text-2xl font-bold', kpi.color)}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">Top 10 véhicules par CA</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVehiclesByRevenue} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" width={120} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), 'CA']} />
                  <Bar dataKey="revenue" fill="hsl(162, 63%, 41%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '150ms' }}>
            <h3 className="mb-4 text-lg font-semibold text-card-foreground">CA véhicules par agence</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agencyRevenue} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} formatter={(v: number) => [formatCurrency(v), 'CA']} />
                  <Bar dataKey="revenue" fill="hsl(222, 47%, 20%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Filters + Table */}
        <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">Liste des véhicules</h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 w-48"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" /> Agence
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setAgencyFilter('all')}>Toutes</DropdownMenuItem>
                  {agencies.filter((a) => a.id !== 'all').map((a) => (
                    <DropdownMenuItem key={a.id} onClick={() => setAgencyFilter(a.id)}>
                      {a.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-3.5 w-3.5" /> Statut
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>Tous</DropdownMenuItem>
                  {Object.entries(vehicleStatusLabels).map(([key, label]) => (
                    <DropdownMenuItem key={key} onClick={() => setStatusFilter(key)}>
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground">Véhicule</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Plaque</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Catégorie</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Agence</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Statut</TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground">Tarif/jour</TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground">CA total</TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground">Locations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((v) => (
                  <TableRow key={v.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        {v.brand} {v.model}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{v.licensePlate}</TableCell>
                    <TableCell>{v.category}</TableCell>
                    <TableCell>{getAgencyName(v.agencyId)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('text-xs', vehicleStatusColors[v.status])}>
                        {vehicleStatusLabels[v.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(v.dailyRate)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(v.totalRevenue)}</TableCell>
                    <TableCell className="text-right">{v.totalRentals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
