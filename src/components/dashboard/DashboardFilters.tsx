import { useState } from 'react';
import { Calendar, Building2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Agency, agencies } from '@/lib/mockData';

interface DashboardFiltersProps {
  selectedAgency: Agency;
  onAgencyChange: (agency: Agency) => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const periods = [
  { id: 'year', label: 'Année 2024' },
  { id: 'semester1', label: 'S1 2024' },
  { id: 'semester2', label: 'S2 2024' },
  { id: 'q1', label: 'T1 2024' },
  { id: 'q2', label: 'T2 2024' },
  { id: 'q3', label: 'T3 2024' },
  { id: 'q4', label: 'T4 2024' },
];

export function DashboardFilters({
  selectedAgency,
  onAgencyChange,
  selectedPeriod,
  onPeriodChange,
}: DashboardFiltersProps) {
  const currentPeriod = periods.find((p) => p.id === selectedPeriod) || periods[0];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Agency Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 bg-card hover:bg-secondary border-border"
          >
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="max-w-[150px] truncate">{selectedAgency.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {agencies.map((agency) => (
            <DropdownMenuItem
              key={agency.id}
              onClick={() => onAgencyChange(agency)}
              className={agency.id === selectedAgency.id ? 'bg-accent' : ''}
            >
              <div className="flex flex-col">
                <span className="font-medium">{agency.name}</span>
                {agency.city && (
                  <span className="text-xs text-muted-foreground">
                    {agency.city}
                  </span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Period Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 bg-card hover:bg-secondary border-border"
          >
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{currentPeriod.label}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {periods.map((period) => (
            <DropdownMenuItem
              key={period.id}
              onClick={() => onPeriodChange(period.id)}
              className={period.id === selectedPeriod ? 'bg-accent' : ''}
            >
              {period.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
