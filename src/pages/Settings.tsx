import { Settings as SettingsIcon, Building2, Palette, Bell, Database, Shield } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  };

  const sections = [
    {
      icon: Building2,
      title: 'Entreprise',
      description: 'Informations générales',
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Nom de l'entreprise</Label>
            <Input defaultValue="AutoLoc SAS" />
          </div>
          <div className="space-y-2">
            <Label>SIRET</Label>
            <Input defaultValue="123 456 789 00012" />
          </div>
          <div className="space-y-2">
            <Label>Email contact</Label>
            <Input defaultValue="contact@autoloc.fr" type="email" />
          </div>
          <div className="space-y-2">
            <Label>Téléphone</Label>
            <Input defaultValue="01 42 36 00 00" />
          </div>
        </div>
      ),
    },
    {
      icon: Palette,
      title: 'Apparence',
      description: 'Personnalisation de l\'interface',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Mode sombre</p>
              <p className="text-sm text-muted-foreground">Activer le thème sombre</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </div>
      ),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Gérer les alertes et notifications',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Notifications push</p>
              <p className="text-sm text-muted-foreground">Recevoir des notifications dans l'app</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Alertes email</p>
              <p className="text-sm text-muted-foreground">Être notifié par email des événements importants</p>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
          </div>
        </div>
      ),
    },
    {
      icon: Database,
      title: 'Données',
      description: 'Export et gestion des données',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Exporter les données</p>
              <p className="text-sm text-muted-foreground">Télécharger un export CSV de toutes les données</p>
            </div>
            <Button variant="outline" size="sm">Exporter</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-card-foreground">Dernière sauvegarde</p>
              <p className="text-sm text-muted-foreground">15 décembre 2024 à 09:30</p>
            </div>
            <Button variant="outline" size="sm">Sauvegarder</Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Paramètres</h1>
          <p className="mt-1 text-muted-foreground">Configuration de l'application</p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="rounded-xl bg-card p-6 card-shadow animate-slide-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
              {section.content}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
