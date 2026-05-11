import { Home, Search, Wrench, BookOpen } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Match nested routes (e.g. /reference matches /reference/drugs/:id). */
  matchPrefix?: string;
}

export const BOTTOM_NAV: NavItem[] = [
  { to: '/', label: '首頁', icon: Home },
  { to: '/reference', label: '快查', icon: Search, matchPrefix: '/reference' },
  { to: '/tools', label: '工具', icon: Wrench, matchPrefix: '/tools' },
  { to: '/learn', label: '學習', icon: BookOpen, matchPrefix: '/learn' },
];
