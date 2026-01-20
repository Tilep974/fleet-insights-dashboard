// Mock data for the vehicle rental company dashboard

export interface Agency {
  id: string;
  name: string;
  city: string;
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
  { id: 'paris', name: 'Paris Centre', city: 'Paris' },
  { id: 'lyon', name: 'Lyon Part-Dieu', city: 'Lyon' },
  { id: 'marseille', name: 'Marseille Vieux-Port', city: 'Marseille' },
  { id: 'bordeaux', name: 'Bordeaux Lac', city: 'Bordeaux' },
  { id: 'nice', name: 'Nice Aéroport', city: 'Nice' },
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
  
  // Calculate growth comparing last 6 months to previous 6 months
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
    fleetUtilization: 78.5, // Simulated
    revenueGrowth: ((last6Revenue - prev6Revenue) / prev6Revenue) * 100,
    expenseGrowth: ((last6Expenses - prev6Expenses) / prev6Expenses) * 100,
  };
};

export const getAgencyData = (agencyId: string): MonthlyData[] => {
  if (agencyId === 'all') return monthlyData;
  
  // Simulate different data per agency with multipliers
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
