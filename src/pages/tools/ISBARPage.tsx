import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { getCardRepository } from '@/repositories';
import type { ISBARTemplateCard } from '@/types/cards/isbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import {
  SECTIONS,
  SECTION_LABEL,
  useISBARDraft,
} from '@/features/isbar/hooks/useISBARDraft';
import { ISBARField } from '@/features/isbar/components/ISBARField';
import { ISBARPreview } from '@/features/isbar/components/ISBARPreview';
import { useTrackOpen } from '@/features/recents/hooks/useTrackOpen';

const ISBAR_SLUG = 'deterioration-report';

export default function ISBARPage() {
  const [card, setCard] = useState<ISBARTemplateCard | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getCardRepository()
      .getBySlug('isbar', ISBAR_SLUG)
      .then((c) => {
        if (cancelled) return;
        if (c && c.type === 'isbar') setCard(c);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useTrackOpen(card?.id);

  if (!card) {
    return <p className="p-4 text-sm text-text-muted">載入中⋯</p>;
  }

  return <ISBARRunner card={card} />;
}

function ISBARRunner({ card }: { card: ISBARTemplateCard }) {
  const {
    values,
    setValue,
    reset,
    piiHits,
    hasAnyPii,
    rendered,
    fieldsBySection,
  } = useISBARDraft(card);

  return (
    <div className="p-4 space-y-4">
      <Link
        to="/tools"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>工具</span>
      </Link>

      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">
          ISBAR · 通報模板
        </p>
        <h1 className="text-2xl font-semibold">{card.title}</h1>
        <p className="text-sm text-text-muted">{card.shortSummary}</p>
      </header>

      {hasAnyPii ? (
        <SafetyBanner kind="SB-7" />
      ) : (
        <SafetyBanner kind="DISC-ISBAR-PII" />
      )}

      <div className="space-y-4">
        {SECTIONS.map((section) => {
          const fields = fieldsBySection[section];
          if (fields.length === 0) return null;
          return (
            <Card key={section}>
              <h2 className="font-semibold mb-2">{SECTION_LABEL[section]}</h2>
              <div className="space-y-3">
                {fields.map((f) => (
                  <ISBARField
                    key={f.key}
                    field={f}
                    value={values[f.key] ?? ''}
                    onChange={(v) => setValue(f.key, v)}
                    piiHits={piiHits[f.key]}
                  />
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {card.pitfalls.length > 0 && (
        <Card>
          <h2 className="font-semibold">常見陷阱</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-text-muted space-y-1">
            {card.pitfalls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Card>
      )}

      <ISBARPreview
        rendered={rendered}
        copyBlocked={hasAnyPii}
        copyBlockedReason={
          hasAnyPii
            ? '偵測到可能的可辨識病人資料，已暫停複製。請先清理紅色欄位。'
            : undefined
        }
      />

      <div className="flex justify-end">
        <Button
          variant="ghost"
          leadingIcon={<RotateCcw className="size-4" />}
          onClick={reset}
        >
          清空全部
        </Button>
      </div>
    </div>
  );
}
