import {
  Store, Building2, Pill, Coffee, Landmark, Warehouse,
  ShoppingBag, ShoppingCart, Hospital, Factory, MapPin, Building,
} from 'lucide-react';

/** Industry icon resolver — keep in sync with keystatic.config INDUSTRY_ICON_NAMES. */
export const industryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Store, Building2, Pill, Coffee, Landmark, Warehouse,
  ShoppingBag, ShoppingCart, Hospital, Factory, MapPin, Building,
};

export function IndustryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = industryIconMap[name] ?? Store;
  return <Icon className={className} />;
}
