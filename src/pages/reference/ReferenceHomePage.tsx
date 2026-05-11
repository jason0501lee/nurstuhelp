import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Pill,
  Stethoscope,
  BookOpen,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface CategoryTile {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: 'primary' | 'info' | 'warn' | 'neutral';
}

const TILES: CategoryTile[] = [
  {
    to: '/reference/vital-signs',
    label: '生命徵象',
    description: '依年齡的正常值與危急值參考',
    icon: HeartPulse,
    tone: 'primary',
  },
  {
    to: '/reference/drugs',
    label: '藥物',
    description: '作用、副作用、護理觀察',
    icon: Pill,
    tone: 'info',
  },
  {
    to: '/reference/diseases',
    label: '疾病',
    description: '一般知識與護理重點',
    icon: Stethoscope,
    tone: 'warn',
  },
  {
    to: '/reference/health-edu',
    label: '衛教',
    description: '對病人講的口語腳本',
    icon: BookOpen,
    tone: 'neutral',
  },
];

const TONE: Record<CategoryTile['tone'], string> = {
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info-soft text-info',
  warn: 'bg-warn-soft text-warn',
  neutral: 'bg-bg text-text',
};

export default function ReferenceHomePage() {
  return (
    <div className="p-4 space-y-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          快查
        </p>
        <h1 className="text-2xl font-semibold">選擇分類</h1>
      </header>

      <ul className="grid grid-cols-1 gap-2">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <li key={t.to}>
              <Link
                to={t.to}
                className="flex items-center gap-3 p-4 rounded-card border border-border bg-surface hover:bg-bg"
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center size-12 rounded-card shrink-0',
                    TONE[t.tone],
                  )}
                  aria-hidden
                >
                  <Icon className="size-6" />
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium text-base">{t.label}</h2>
                  <p className="text-sm text-text-muted">{t.description}</p>
                </div>
                <ChevronRight className="size-5 text-text-muted" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
