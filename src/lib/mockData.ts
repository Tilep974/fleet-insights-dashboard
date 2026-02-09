// Mock data for the vehicle rental company dashboard

export interface Agency {
  id: string;
  name: string;
  city: string;
  address?: string;
  phone?: string;
  vehicleCount?: number;
  manager?: string;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  licensePlate: string;
  category: 'Citadine' | 'Berline' | 'SUV' | 'Utilitaire' | 'Premium';
  agencyId: string;
  year: number;
  status: 'available' | 'rented' | 'maintenance' | 'out_of_service';
  dailyRate: number;
  mileage: number;
  totalRevenue: number;
  totalRentals: number;
}

export interface MonthlyData {
  month: string;
  monthShort: string;
  revenue: number;
  expenses: number;
  profit: number;
  rentals: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ExpenseTransaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  agencyId: string;
  vehicleId?: string;
  createdBy: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'accountant' | 'viewer';
  agencyId: string;
  avatar?: string;
  lastLogin: string;
}

export interface KPIData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  totalRentals: number;
  avgRevenuePerRental: number;
  fleetUtilization: number;
  revenueGrowth: number;
  expenseGrowth: number;
}

export const agencies: Agency[] = [
  { id: 'all', name: 'Toutes les agences', city: '' },
  { id: 'paris', name: 'Paris Centre', city: 'Paris', address: '15 Rue de Rivoli, 75001 Paris', phone: '01 42 36 00 00', vehicleCount: 45, manager: 'Marie Dupont' },
  { id: 'lyon', name: 'Lyon Part-Dieu', city: 'Lyon', address: '3 Place Charles Béraudier, 69003 Lyon', phone: '04 72 10 00 00', vehicleCount: 32, manager: 'Jean Martin' },
  { id: 'marseille', name: 'Marseille Vieux-Port', city: 'Marseille', address: '1 Quai du Port, 13002 Marseille', phone: '04 91 00 00 00', vehicleCount: 28, manager: 'Sophie Laurent' },
  { id: 'bordeaux', name: 'Bordeaux Lac', city: 'Bordeaux', address: '45 Avenue des Quarante Journaux, 33300 Bordeaux', phone: '05 56 00 00 00', vehicleCount: 20, manager: 'Pierre Moreau' },
  { id: 'nice', name: 'Nice Aéroport', city: 'Nice', address: 'Terminal 2, Aéroport Nice Côte d\'Azur, 06200 Nice', phone: '04 93 00 00 00', vehicleCount: 25, manager: 'Claire Bernard' },
];

export const vehicles: Vehicle[] = [
  // Paris
  { id: 'v1', brand: 'Renault', model: 'Clio V', licensePlate: 'AB-123-CD', category: 'Citadine', agencyId: 'paris', year: 2023, status: 'rented', dailyRate: 35, mileage: 24500, totalRevenue: 42000, totalRentals: 85 },
  { id: 'v2', brand: 'Peugeot', model: '308', licensePlate: 'EF-456-GH', category: 'Berline', agencyId: 'paris', year: 2023, status: 'available', dailyRate: 55, mileage: 18200, totalRevenue: 58000, totalRentals: 72 },
  { id: 'v3', brand: 'Peugeot', model: '3008', licensePlate: 'IJ-789-KL', category: 'SUV', agencyId: 'paris', year: 2022, status: 'rented', dailyRate: 75, mileage: 35600, totalRevenue: 89000, totalRentals: 95 },
  { id: 'v4', brand: 'Renault', model: 'Kangoo', licensePlate: 'MN-012-OP', category: 'Utilitaire', agencyId: 'paris', year: 2022, status: 'maintenance', dailyRate: 45, mileage: 52000, totalRevenue: 35000, totalRentals: 60 },
  { id: 'v5', brand: 'BMW', model: 'Série 3', licensePlate: 'QR-345-ST', category: 'Premium', agencyId: 'paris', year: 2024, status: 'available', dailyRate: 120, mileage: 8500, totalRevenue: 72000, totalRentals: 45 },
  { id: 'v6', brand: 'Citroën', model: 'C3', licensePlate: 'UV-678-WX', category: 'Citadine', agencyId: 'paris', year: 2023, status: 'rented', dailyRate: 32, mileage: 28000, totalRevenue: 38000, totalRentals: 90 },
  // Lyon
  { id: 'v7', brand: 'Renault', model: 'Captur', licensePlate: 'YZ-901-AB', category: 'SUV', agencyId: 'lyon', year: 2023, status: 'available', dailyRate: 55, mileage: 21000, totalRevenue: 52000, totalRentals: 68 },
  { id: 'v8', brand: 'Peugeot', model: '208', licensePlate: 'CD-234-EF', category: 'Citadine', agencyId: 'lyon', year: 2023, status: 'rented', dailyRate: 30, mileage: 19500, totalRevenue: 36000, totalRentals: 82 },
  { id: 'v9', brand: 'Volkswagen', model: 'Golf', licensePlate: 'GH-567-IJ', category: 'Berline', agencyId: 'lyon', year: 2022, status: 'available', dailyRate: 50, mileage: 42000, totalRevenue: 61000, totalRentals: 78 },
  { id: 'v10', brand: 'Mercedes', model: 'Classe A', licensePlate: 'KL-890-MN', category: 'Premium', agencyId: 'lyon', year: 2024, status: 'rented', dailyRate: 110, mileage: 6200, totalRevenue: 55000, totalRentals: 35 },
  // Marseille
  { id: 'v11', brand: 'Fiat', model: '500', licensePlate: 'OP-123-QR', category: 'Citadine', agencyId: 'marseille', year: 2023, status: 'available', dailyRate: 28, mileage: 15800, totalRevenue: 29000, totalRentals: 75 },
  { id: 'v12', brand: 'Dacia', model: 'Duster', licensePlate: 'ST-456-UV', category: 'SUV', agencyId: 'marseille', year: 2022, status: 'rented', dailyRate: 48, mileage: 45000, totalRevenue: 48000, totalRentals: 70 },
  { id: 'v13', brand: 'Renault', model: 'Master', licensePlate: 'WX-789-YZ', category: 'Utilitaire', agencyId: 'marseille', year: 2021, status: 'out_of_service', dailyRate: 65, mileage: 85000, totalRevenue: 42000, totalRentals: 45 },
  // Bordeaux
  { id: 'v14', brand: 'Peugeot', model: '2008', licensePlate: 'AB-234-CD', category: 'SUV', agencyId: 'bordeaux', year: 2023, status: 'available', dailyRate: 50, mileage: 22000, totalRevenue: 44000, totalRentals: 62 },
  { id: 'v15', brand: 'Citroën', model: 'Berlingo', licensePlate: 'EF-567-GH', category: 'Utilitaire', agencyId: 'bordeaux', year: 2022, status: 'rented', dailyRate: 42, mileage: 38000, totalRevenue: 32000, totalRentals: 55 },
  // Nice
  { id: 'v16', brand: 'Audi', model: 'A3', licensePlate: 'IJ-890-KL', category: 'Premium', agencyId: 'nice', year: 2024, status: 'rented', dailyRate: 105, mileage: 5500, totalRevenue: 68000, totalRentals: 48 },
  { id: 'v17', brand: 'Renault', model: 'Twingo', licensePlate: 'MN-123-OP', category: 'Citadine', agencyId: 'nice', year: 2023, status: 'available', dailyRate: 25, mileage: 17000, totalRevenue: 22000, totalRentals: 65 },
  { id: 'v18', brand: 'Toyota', model: 'RAV4', licensePlate: 'QR-456-ST', category: 'SUV', agencyId: 'nice', year: 2023, status: 'rented', dailyRate: 70, mileage: 28000, totalRevenue: 62000, totalRentals: 60 },
];

export const expenseTransactions: ExpenseTransaction[] = [
  { id: 'e1', date: '2024-12-15', category: 'Carburant', description: 'Plein de carburant - Clio V', amount: 65, agencyId: 'paris', vehicleId: 'v1', createdBy: 'Marie Dupont', status: 'approved' },
  { id: 'e2', date: '2024-12-14', category: 'Maintenance', description: 'Révision 30 000km - 308', amount: 450, agencyId: 'paris', vehicleId: 'v2', createdBy: 'Marie Dupont', status: 'approved' },
  { id: 'e3', date: '2024-12-13', category: 'Assurances', description: 'Prime assurance mensuelle - Flotte Paris', amount: 2800, agencyId: 'paris', createdBy: 'Marie Dupont', status: 'approved' },
  { id: 'e4', date: '2024-12-12', category: 'Carburant', description: 'Plein de carburant - Captur', amount: 72, agencyId: 'lyon', vehicleId: 'v7', createdBy: 'Jean Martin', status: 'approved' },
  { id: 'e5', date: '2024-12-11', category: 'Maintenance', description: 'Changement pneus - Duster', amount: 680, agencyId: 'marseille', vehicleId: 'v12', createdBy: 'Sophie Laurent', status: 'pending' },
  { id: 'e6', date: '2024-12-10', category: 'Salaires', description: 'Salaires décembre - Agence Paris', amount: 12500, agencyId: 'paris', createdBy: 'Marie Dupont', status: 'approved' },
  { id: 'e7', date: '2024-12-09', category: 'Loyers', description: 'Loyer mensuel - Agence Lyon', amount: 3200, agencyId: 'lyon', createdBy: 'Jean Martin', status: 'approved' },
  { id: 'e8', date: '2024-12-08', category: 'Marketing', description: 'Campagne Google Ads décembre', amount: 1500, agencyId: 'paris', createdBy: 'Marie Dupont', status: 'approved' },
  { id: 'e9', date: '2024-12-07', category: 'Carburant', description: 'Plein de carburant - A3', amount: 85, agencyId: 'nice', vehicleId: 'v16', createdBy: 'Claire Bernard', status: 'approved' },
  { id: 'e10', date: '2024-12-06', category: 'Maintenance', description: 'Réparation carrosserie - Master', amount: 1200, agencyId: 'marseille', vehicleId: 'v13', createdBy: 'Sophie Laurent', status: 'rejected' },
  { id: 'e11', date: '2024-12-05', category: 'Autres', description: 'Fournitures bureau - Agence Bordeaux', amount: 180, agencyId: 'bordeaux', createdBy: 'Pierre Moreau', status: 'approved' },
  { id: 'e12', date: '2024-12-04', category: 'Assurances', description: 'Assurance complémentaire - SUVs Nice', amount: 450, agencyId: 'nice', createdBy: 'Claire Bernard', status: 'pending' },
  { id: 'e13', date: '2024-12-03', category: 'Carburant', description: 'Plein de carburant - Golf', amount: 70, agencyId: 'lyon', vehicleId: 'v9', createdBy: 'Jean Martin', status: 'approved' },
  { id: 'e14', date: '2024-12-02', category: 'Salaires', description: 'Salaires décembre - Agence Lyon', amount: 8500, agencyId: 'lyon', createdBy: 'Jean Martin', status: 'approved' },
  { id: 'e15', date: '2024-12-01', category: 'Loyers', description: 'Loyer mensuel - Agence Marseille', amount: 2600, agencyId: 'marseille', createdBy: 'Sophie Laurent', status: 'approved' },
];

export const users: UserProfile[] = [
  { id: 'u1', name: 'Marie Dupont', email: 'marie.dupont@autoloc.fr', role: 'admin', agencyId: 'paris', lastLogin: '2024-12-15 09:30' },
  { id: 'u2', name: 'Jean Martin', email: 'jean.martin@autoloc.fr', role: 'manager', agencyId: 'lyon', lastLogin: '2024-12-15 08:45' },
  { id: 'u3', name: 'Sophie Laurent', email: 'sophie.laurent@autoloc.fr', role: 'manager', agencyId: 'marseille', lastLogin: '2024-12-14 17:20' },
  { id: 'u4', name: 'Pierre Moreau', email: 'pierre.moreau@autoloc.fr', role: 'manager', agencyId: 'bordeaux', lastLogin: '2024-12-15 10:00' },
  { id: 'u5', name: 'Claire Bernard', email: 'claire.bernard@autoloc.fr', role: 'manager', agencyId: 'nice', lastLogin: '2024-12-14 16:30' },
  { id: 'u6', name: 'Luc Petit', email: 'luc.petit@autoloc.fr', role: 'accountant', agencyId: 'paris', lastLogin: '2024-12-15 09:15' },
  { id: 'u7', name: 'Emma Roux', email: 'emma.roux@autoloc.fr', role: 'viewer', agencyId: 'lyon', lastLogin: '2024-12-13 14:00' },
  { id: 'u8', name: 'Thomas Girard', email: 'thomas.girard@autoloc.fr', role: 'accountant', agencyId: 'marseille', lastLogin: '2024-12-15 08:00' },
];

export const monthlyData: MonthlyData[] = [
  { month: 'Janvier', monthShort: 'Jan', revenue: 285000, expenses: 198000, profit: 87000, rentals: 342 },
  { month: 'Février', monthShort: 'Fév', revenue: 265000, expenses: 185000, profit: 80000, rentals: 318 },
  { month: 'Mars', monthShort: 'Mar', revenue: 312000, expenses: 205000, profit: 107000, rentals: 385 },
  { month: 'Avril', monthShort: 'Avr', revenue: 345000, expenses: 218000, profit: 127000, rentals: 425 },
  { month: 'Mai', monthShort: 'Mai', revenue: 398000, expenses: 245000, profit: 153000, rentals: 487 },
  { month: 'Juin', monthShort: 'Juin', revenue: 425000, expenses: 262000, profit: 163000, rentals: 520 },
  { month: 'Juillet', monthShort: 'Juil', revenue: 512000, expenses: 298000, profit: 214000, rentals: 625 },
  { month: 'Août', monthShort: 'Août', revenue: 535000, expenses: 312000, profit: 223000, rentals: 652 },
  { month: 'Septembre', monthShort: 'Sep', revenue: 445000, expenses: 268000, profit: 177000, rentals: 545 },
  { month: 'Octobre', monthShort: 'Oct', revenue: 378000, expenses: 235000, profit: 143000, rentals: 465 },
  { month: 'Novembre', monthShort: 'Nov', revenue: 325000, expenses: 212000, profit: 113000, rentals: 398 },
  { month: 'Décembre', monthShort: 'Déc', revenue: 358000, expenses: 225000, profit: 133000, rentals: 438 },
];

export const expenseCategories: ExpenseCategory[] = [
  { category: 'Carburant', amount: 485000, percentage: 18.2, color: 'hsl(var(--chart-1))' },
  { category: 'Maintenance', amount: 412000, percentage: 15.5, color: 'hsl(var(--chart-2))' },
  { category: 'Assurances', amount: 378000, percentage: 14.2, color: 'hsl(var(--chart-3))' },
  { category: 'Salaires', amount: 625000, percentage: 23.5, color: 'hsl(var(--chart-4))' },
  { category: 'Loyers', amount: 285000, percentage: 10.7, color: 'hsl(var(--chart-5))' },
  { category: 'Marketing', amount: 158000, percentage: 5.9, color: 'hsl(162 63% 51%)' },
  { category: 'Autres', amount: 320000, percentage: 12.0, color: 'hsl(215 16% 47%)' },
];

export const calculateKPIs = (data: MonthlyData[]): KPIData => {
  const totalRevenue = data.reduce((sum, m) => sum + m.revenue, 0);
  const totalExpenses = data.reduce((sum, m) => sum + m.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const totalRentals = data.reduce((sum, m) => sum + m.rentals, 0);
  
  const last6Revenue = data.slice(-6).reduce((sum, m) => sum + m.revenue, 0);
  const prev6Revenue = data.slice(0, 6).reduce((sum, m) => sum + m.revenue, 0);
  const last6Expenses = data.slice(-6).reduce((sum, m) => sum + m.expenses, 0);
  const prev6Expenses = data.slice(0, 6).reduce((sum, m) => sum + m.expenses, 0);

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin: (netProfit / totalRevenue) * 100,
    totalRentals,
    avgRevenuePerRental: totalRevenue / totalRentals,
    fleetUtilization: 78.5,
    revenueGrowth: ((last6Revenue - prev6Revenue) / prev6Revenue) * 100,
    expenseGrowth: ((last6Expenses - prev6Expenses) / prev6Expenses) * 100,
  };
};

export const getAgencyData = (agencyId: string): MonthlyData[] => {
  if (agencyId === 'all') return monthlyData;
  
  const multipliers: Record<string, number> = {
    paris: 1.3,
    lyon: 0.85,
    marseille: 0.75,
    bordeaux: 0.55,
    nice: 0.65,
  };
  
  const mult = multipliers[agencyId] || 1;
  
  return monthlyData.map(m => ({
    ...m,
    revenue: Math.round(m.revenue * mult),
    expenses: Math.round(m.expenses * mult),
    profit: Math.round(m.profit * mult),
    rentals: Math.round(m.rentals * mult),
  }));
};

export const getVehiclesByAgency = (agencyId: string): Vehicle[] => {
  if (agencyId === 'all') return vehicles;
  return vehicles.filter(v => v.agencyId === agencyId);
};

export const getExpensesByAgency = (agencyId: string): ExpenseTransaction[] => {
  if (agencyId === 'all') return expenseTransactions;
  return expenseTransactions.filter(e => e.agencyId === agencyId);
};

export const getAgencyName = (agencyId: string): string => {
  const agency = agencies.find(a => a.id === agencyId);
  return agency ? agency.name : agencyId;
};

export const getVehicleLabel = (vehicleId: string): string => {
  const vehicle = vehicles.find(v => v.id === vehicleId);
  return vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.licensePlate})` : vehicleId;
};

export const vehicleStatusLabels: Record<string, string> = {
  available: 'Disponible',
  rented: 'En location',
  maintenance: 'En maintenance',
  out_of_service: 'Hors service',
};

export const vehicleStatusColors: Record<string, string> = {
  available: 'bg-success/10 text-success',
  rented: 'bg-primary/10 text-primary',
  maintenance: 'bg-warning/10 text-warning',
  out_of_service: 'bg-destructive/10 text-destructive',
};

export const roleLabels: Record<string, string> = {
  admin: 'Administrateur',
  manager: 'Manager',
  accountant: 'Comptable',
  viewer: 'Lecture seule',
};

export const expenseStatusLabels: Record<string, string> = {
  pending: 'En attente',
  approved: 'Approuvée',
  rejected: 'Rejetée',
};

export const expenseStatusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('fr-FR').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};
