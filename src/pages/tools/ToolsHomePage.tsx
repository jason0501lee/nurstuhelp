import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  MessageSquareText,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface ToolEntry {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  tone: 'critical' | 'primary';
  badge?: string;
}

const TOOLS: ToolEntry[] = [
  {
    to: '/tools/medcheck',
    label: '給藥三讀六對',
    description: '給藥前 30 秒輔助再核對流程',
    icon: ClipboardCheck,
    tone: 'critical',
    badge: '⭐ MVP 安全爆點',
  },
  {
    to: '/tools/isbar',
    label: 'ISBAR 交班 / 通報',
    description: '結構化組織溝通內容；自動偵測可辨識病人資料',
    icon: MessageSquareText,
    tone: 'primary',
  },
];

const TONE: Record<ToolEntry['tone'], string> = {
  critical: 'bg-critical-soft text-critical',
  primary: 'bg-primary/10 text-primary',
};

export default function ToolsHomePage() {
  return (
    <div className="p-4 space-y-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          工具
        </p>
        <h1 className="text-2xl font-semibold">流程與核對</h1>
      </header>

      <ul className="space-y-2">
        {TOOLS.map((t) => {
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
                  {t.badge && (
                    <p className="text-[11px] text-critical font-medium">
                      {t.badge}
                    </p>
                  )}
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
