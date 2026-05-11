import type { VitalSignCard, AgeBand } from '@/types/cards/vitalSign';

interface VitalSignBodyProps {
  card: VitalSignCard;
}

function rangeText(band: AgeBand, unit: string): string {
  if (band.normalMin == null && band.normalMax == null) return '—';
  if (band.normalMin != null && band.normalMax != null) {
    return `${band.normalMin}–${band.normalMax} ${unit}`;
  }
  if (band.normalMin != null) return `≥ ${band.normalMin} ${unit}`;
  return `≤ ${band.normalMax} ${unit}`;
}

export function VitalSignBody({ card }: VitalSignBodyProps) {
  return (
    <div className="space-y-4">
      <section
        aria-label="正常範圍"
        className="rounded-card border border-border bg-surface"
      >
        <header className="px-4 py-3 border-b border-border">
          <h2 className="font-semibold">依年齡正常範圍</h2>
          <p className="text-xs text-text-muted mt-0.5">
            單位：{card.unit}
          </p>
        </header>
        <dl className="divide-y divide-border">
          {card.byAgeTable.map((band, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-2 px-4 py-2 text-sm items-baseline"
            >
              <dt className="col-span-3 font-medium text-text leading-snug">
                {band.ageLabel}
                {band.awakeOnly && (
                  <span className="block text-xs text-text-muted">
                    （清醒安靜時）
                  </span>
                )}
              </dt>
              <dd className="col-span-2 text-text-muted text-right tabular-nums">
                {rangeText(band, card.unit)}
              </dd>
              {band.notes && (
                <p className="col-span-5 text-xs text-text-muted -mt-1">
                  {band.notes}
                </p>
              )}
            </div>
          ))}
        </dl>
      </section>

      {card.criticalValues && (
        <section
          aria-label="危急值參考"
          className="rounded-card border border-warn/30 bg-warn-soft p-3 text-sm"
        >
          <h3 className="font-semibold text-warn">危急值參考</h3>
          <p className="mt-1 text-text">
            {card.criticalValues.low != null && (
              <>
                低：&lt; {card.criticalValues.low} {card.unit}
              </>
            )}
            {card.criticalValues.high != null && (
              <>
                高：&gt; {card.criticalValues.high} {card.unit}
              </>
            )}
          </p>
          <p className="text-xs text-text-muted mt-1">
            {card.criticalValues.note}
          </p>
        </section>
      )}

      {card.contextModifiers && card.contextModifiers.length > 0 && (
        <section className="rounded-card border border-border bg-surface p-4">
          <h3 className="font-semibold text-text">常見情境修正</h3>
          <dl className="mt-2 space-y-2 text-sm">
            {card.contextModifiers.map((m, i) => (
              <div key={i}>
                <dt className="font-medium">{m.context}</dt>
                <dd className="text-text-muted">{m.adjustment}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {card.measurementTips && card.measurementTips.length > 0 && (
        <section className="rounded-card border border-border bg-surface p-4">
          <h3 className="font-semibold text-text">量測小提示</h3>
          <ul className="mt-2 list-disc list-inside text-sm text-text-muted space-y-1">
            {card.measurementTips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
