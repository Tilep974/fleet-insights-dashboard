import { Users as UsersIcon, Shield, Eye, Calculator, Crown } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { users, roleLabels, getAgencyName } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const roleIcons: Record<string, React.ElementType> = {
  admin: Crown,
  manager: Shield,
  accountant: Calculator,
  viewer: Eye,
};

const roleColors: Record<string, string> = {
  admin: 'bg-destructive/10 text-destructive',
  manager: 'bg-primary/10 text-primary',
  accountant: 'bg-warning/10 text-warning',
  viewer: 'bg-muted text-muted-foreground',
};

export default function Users() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Utilisateurs</h1>
          <p className="mt-1 text-muted-foreground">Gestion des accès et des rôles</p>
        </div>

        {/* Role summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(roleLabels).map(([key, label], i) => {
            const count = users.filter((u) => u.role === key).length;
            const Icon = roleIcons[key];
            return (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl bg-card p-5 card-shadow animate-slide-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={cn('rounded-xl p-2.5', roleColors[key])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-2xl font-bold text-card-foreground">{count}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Users Table */}
        <div className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <h3 className="mb-4 text-lg font-semibold text-card-foreground">Liste des utilisateurs</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground">Nom</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Email</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Rôle</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Agence</TableHead>
                  <TableHead className="font-semibold text-muted-foreground">Dernière connexion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const Icon = roleIcons[user.role];
                  return (
                    <TableRow key={user.id} className="border-border hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {user.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn('gap-1 text-xs', roleColors[user.role])}>
                          <Icon className="h-3 w-3" />
                          {roleLabels[user.role]}
                        </Badge>
                      </TableCell>
                      <TableCell>{getAgencyName(user.agencyId)}</TableCell>
                      <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
