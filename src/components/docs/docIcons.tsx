import {
  BookOpen, Rocket, Server, BarChart3, Camera, CreditCard, LayoutGrid, Code,
  ShieldCheck, Database, UserCheck, Scale, Grid3x3, TrendingUp, FileText, Calendar,
  HelpCircle, Lightbulb, SlidersHorizontal, ShieldAlert,
} from 'lucide-react';

/** Doc icon resolver — keep DOC_ICON_NAMES in sync with keystatic.config. */
export const docIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Rocket, Server, BarChart3, Camera, CreditCard, LayoutGrid, Code,
  ShieldCheck, Database, UserCheck, Scale, Grid3x3, TrendingUp, FileText, Calendar,
  HelpCircle, Lightbulb, SlidersHorizontal, ShieldAlert,
};

export const DOC_ICON_NAMES = Object.keys(docIconMap);

export function DocIcon({ name, className }: { name: string; className?: string }) {
  const Icon = docIconMap[name] ?? BookOpen;
  return <Icon className={className} />;
}
