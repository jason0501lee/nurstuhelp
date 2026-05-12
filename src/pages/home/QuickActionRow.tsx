import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  MessageSquareText,
  Pill,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface QuickAction {
  to: string;
  label: string;
  icon: LucideIcon;
  tone: 'critical' | 'primary' | 'neutral';
}

/**
 * The four anchor entry points surfaced on the home page. Top-row
 * picks: the two safety/communication flows and the two highest-use
 * reference categories. Calculators are deliberately not exposed at
 * MVP — see Step 6 spec.
 */
const ACTIONS: QuickAction[] = [
  { to: '/tools/medcheck', label: '三讀六對', icon: ClipboardCheck, tone: 'critical' },
  { to: '/tools/isbar', label: 'ISBAR', icon: MessageSquareText, tone: 'primary' },
  { to: '/reference/drugs', label: '藥物', icon: Pill, tone: 'neutral' },
  { to: '/reference/vital-signs', label: '生命徵象', icon: HeartPulse, tone: 'neutral' },
];

const TONE: Record<QuickAction['tone'], string> = {
  critical: 'bg-critical-soft text-critical',
  primary: 'bg-primary/10 text-primary',
  neutral: 'bg-bg text-text',
};

export function QuickActionRow() {
  return (
    <nav aria-label="快速動作" className="grid grid-cols-4 gap-2">
      {ACTIONS.map((a) => {
        const Icon = a.icon;
        return (
          <Link
            key={a.to}
            to={a.to}
            className={cn(
              'flex flex-col items-center justify-center gap-1 rounded-card border border-border p-3 hover:opacity-90 active:opacity-90',
              'min-h-[5rem]',
            )}
          >
            <span
              className={cn(
                'inline-flex items-center justify-center size-10 rounded-full',
                TONE[a.tone],
              )}
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <span className="text-xs font-medium text-text leading-tight text-center">
              {a.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
