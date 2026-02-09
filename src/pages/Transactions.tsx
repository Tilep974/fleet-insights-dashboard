import { useState, useMemo } from 'react';
import { Plus, Search, Filter, Receipt, Euro, Clock, CheckCircle, XCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  ExpenseTransaction,
  expenseTransactions as initialExpenses,
  agencies,
  vehicles,
  expenseStatusLabels,
  expenseStatusColors,
  expenseCategories,
  getAgencyName,
  getVehicleLabel,
  formatCurrency,
} from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function Transactions() {
  const [expenses, setExpenses] = useState<ExpenseTransaction[]>(initialExpenses);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);

  // New expense form state
  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    amount: '',
    agencyId: '',
    vehicleId: '',
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchSearch =
        search === '' ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || e.category === categoryFilter;
      const matchStatus = statusFilter === 'all' || e.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [expenses, search, categoryFilter, statusFilter]);

  const kpis = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const pending = expenses.filter((e) => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
    const approved = expenses.filter((e) => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
    const count = expenses.length;
    return { total, pending, approved, count };
  }, [expenses]);

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.agencyId) return;

    const expense: ExpenseTransaction = {
      id: `e${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      agencyId: newExpense.agencyId,
      vehicleId: newExpense.vehicleId || undefined,
      createdBy: 'Utilisateur actuel',
      status: 'pending',
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ category: '', description: '', amount: '', agencyId: '', vehicleId: '' });
    setDialogOpen(false);
  };

  const agencyVehicles = useMemo(() => {
    if (!newExpense.agencyId) return [];
    return vehicles.filter((v) => v.agencyId === newExpense.agencyId);
  }, [newExpense.agencyId]);

  const categories = [...new Set(expenseCategories.map((c) => c.category))];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Transactions</h1>
            <p className="mt-1 text-muted-foreground">Suivi et saisie des dépenses</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Ajouter une dépense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nouvelle dépense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Catégorie *</Label>
                  <Select value={newExpense.category} onValueChange={(v) => setNewExpense({ ...newExpense, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Agence *</Label>
                  <Select value={newExpense.agencyId} onValueChange={(v) => setNewExpense({ ...newExpense, agencyId: v, vehicleId: '' })}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                    <SelectContent>
                      {agencies.filter((a) => a.id !== 'all').map((a) => (
                        <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Véhicule (optionnel)</Label>
                  <Select value={newExpense.vehicleId} onValueChange={(v) => setNewExpense({ ...newExpense, vehicleId: v })}>
                    <SelectTrigger><SelectValue placeholder="Aucun véhicule" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucun</SelectItem>
                      {agencyVehicles.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.brand} {v.model} ({v.licensePlate})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Montant (€) *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Décrivez la dépense..."
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    maxLength={200}
                  />
                </div>

                <Button onClick={handleAddExpense} className="w-full" disabled={!newExpense.category || !newExpense.description || !newExpense.amount || !newExpense.agencyId}>
                  Enregistrer la dépense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* KPIs */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total dépenses', value: formatCurrency(kpis.total), icon: Euro, color: 'text-card-foreground' },
            { label: 'Approuvées', value: formatCurrency(kpis.approved), icon: CheckCircle, color: 'text-success' },
            { label: 'En attente', value: formatCurrency(kpis.pending), icon: Clock, color: 'text-warning' },
            { label: 'Nb. transactions', value: kpis.count.toString(), icon: Receipt, color: 'text-card-foreground' },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="flex items-center gap-3 rounded-xl bg-card p-5 card-shadow animate-slide-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="rounded-xl bg-primary/10 p-2.5">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className={cn('text-xl font-bold', kpi.color)}>{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">Historique des dépenses</h3>
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
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {Object.entries(expenseStatusLabels).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Catégorie</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Description</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Agence</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Véhicule</TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground">Montant</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Statut</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Créé par</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((e) => (
                  <TableRow key={e.id} className="border-border hover:bg-muted/50">
                    <TableCell className="text-sm">{new Date(e.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{e.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[250px] truncate text-sm">{e.description}</TableCell>
                    <TableCell className="text-sm">{getAgencyName(e.agencyId)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {e.vehicleId ? getVehicleLabel(e.vehicleId) : '—'}
                    </TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(e.amount)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={cn('text-xs', expenseStatusColors[e.status])}>
                        {expenseStatusLabels[e.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{e.createdBy}</TableCell>
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
