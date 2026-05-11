import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Card } from '@/types/card';
import { PriorityBadge } from '@/features/cards/components/PriorityBadge';

const TYPE_PATH: Record<Card['type'], string> = {
  vital_sign: '/reference/vital-signs',
  drug: '/reference/drugs',
  disease: '/reference/diseases',
  health_edu: '/reference/health-edu',
  sop: '/reference/sop',
  isbar: '/tools/isbar',
  med_safety: '/tools/medcheck',
};

const TYPE_LABEL: Record<Card['type'], string> = {
  vital_sign: '生命徵象',
  drug: '藥物',
  disease: '疾病',
  health_edu: '衛教',
  sop: 'SOP',
  isbar: 'ISBAR',
  med_safety: '安全核對',
};

interface HorizontalCardScrollerProps {
  cards: readonly Card[];
  emptyHint?: string;
  /** Optional right-aligned "看全部" link. */
  moreTo?: string;
}

export function HorizontalCardScroller({
  cards,
  emptyHint = '尚無紀錄',
  moreTo,
}: HorizontalCardScrollerProps) {
  // De-duplicate by id while preserving order (recents + favorites can overlap).
  const visible = useMemo(() => {
    const seen = new Set<string>();
    const out: Card[] = [];
    for (const c of cards) {
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      out.push(c);
    }
    return out;
  }, [cards]);

  if (visible.length === 0) {
    return (
      <p className="text-sm text-text-muted px-1 py-2">{emptyHint}</p>
    );
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
        {visible.map((c) => (
          <Link
            key={c.id}
            to={`${TYPE_PATH[c.type]}/${c.slug}`}
            className="shrink-0 w-[14rem] rounded-card border border-border bg-surface p-3 flex flex-col gap-1.5 hover:bg-bg"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-text-muted">
                {TYPE_LABEL[c.type]}
              </span>
              <PriorityBadge priority={c.priority} />
            </div>
            <h3 className="font-medium text-sm leading-snug line-clamp-2">
              {c.title}
            </h3>
            <p className="text-xs text-text-muted line-clamp-2">
              {c.shortSummary}
            </p>
          </Link>
        ))}
      </div>
      {moreTo && visible.length >= 6 && (
        <div className="text-right">
          <Link
            to={moreTo}
            className="inline -mr-2 inline-flex items-center text-sm text-primary px-2 py-1"
          >
            看全部 <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
