import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Stethoscope,
  Brain,
  Users,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface AssessmentTile {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: 'primary' | 'info' | 'warn' | 'neutral';
}

const TILES: AssessmentTile[] = [
  {
    to: '/reference/vital-signs',
    label: '生命徵象',
    description: '依年齡正常值與危急值參考',
    icon: HeartPulse,
    tone: 'primary',
  },
  {
    to: '/reference/assessment/physical',
    label: '身體評估',
    description: '頭到腳、系統性評估與書寫範例',
    icon: Stethoscope,
    tone: 'info',
  },
  {
    to: '/reference/assessment/psychological',
    label: '心理評估',
    description: '情緒、認知、思考、自傷風險',
    icon: Brain,
    tone: 'warn',
  },
  {
    to: '/reference/assessment/social',
    label: '社會評估',
    description: '家庭、支持系統、出院規劃',
    icon: Users,
    tone: 'neutral',
  },
];

const TONE: Record<AssessmentTile['tone'], string> = {
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info-soft text-info',
  warn: 'bg-warn-soft text-warn',
  neutral: 'bg-bg text-text',
};

export default function AssessmentHomePage() {
  return (
    <div className="p-4 space-y-4">
      <Link
        to="/reference"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>快查</span>
      </Link>

      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          基本評估
        </p>
        <h1 className="text-2xl font-semibold">選擇評估面向</h1>
        <p className="text-sm text-text-muted">
          護理評估三軸：生理、心理、社會。
        </p>
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
