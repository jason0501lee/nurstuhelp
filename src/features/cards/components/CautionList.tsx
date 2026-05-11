import type { CautionItem } from '@/types/safety';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import { CAUTION_SCOPE_LABELS } from '@/data/dictionaries';

interface CautionListProps {
  cautions: readonly CautionItem[];
}

/**
 * Renders the caution[] array of any card. Critical entries are
 * never collapsed; info/warning entries follow the registry banner
 * styling. Always above-the-fold per safety governance §4 display
 * rules.
 */
export function CautionList({ cautions }: CautionListProps) {
  if (cautions.length === 0) return null;
  return (
    <section className="space-y-2" aria-label="安全提醒">
      {cautions.map((c, i) => (
        <SafetyBanner
          key={i}
          level={c.level}
          title={
            c.scope
              ? `${CAUTION_SCOPE_LABELS[c.scope]}・提醒`
              : c.level === 'critical'
                ? '高度警示'
                : c.level === 'warning'
                  ? '注意'
                  : '提示'
          }
          body={
            c.appliesWhen
              ? `（${c.appliesWhen}）${c.message}`
              : c.message
          }
        />
      ))}
    </section>
  );
}
