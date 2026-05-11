import { AlertOctagon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { DrugCard } from '@/types/cards/drug';

const ROUTE_LABEL: Record<string, string> = {
  po: '口服 PO',
  iv: 'IV',
  im: 'IM',
  sc: 'SC',
  topical: '外用',
  inhaled: '吸入',
  pr: '直腸 PR',
  sl: '舌下 SL',
};

interface DrugBodyProps {
  card: DrugCard;
}

export function DrugBody({ card }: DrugBodyProps) {
  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-semibold">藥物資訊</h2>
        <dl className="mt-2 grid grid-cols-3 gap-x-3 gap-y-2 text-sm">
          <dt className="font-medium text-text-muted">學名</dt>
          <dd className="col-span-2">{card.genericName}</dd>
          <dt className="font-medium text-text-muted">商品名</dt>
          <dd className="col-span-2">
            {card.brandNames.length > 0 ? card.brandNames.join('、') : '—'}
          </dd>
          <dt className="font-medium text-text-muted">藥理分類</dt>
          <dd className="col-span-2">{card.drugClass.join('、')}</dd>
          <dt className="font-medium text-text-muted">給藥途徑</dt>
          <dd className="col-span-2 flex flex-wrap gap-1">
            {card.routes.map((r) => (
              <Badge key={r} tone="neutral">
                {ROUTE_LABEL[r] ?? r}
              </Badge>
            ))}
          </dd>
          {card.lasaWarnings && card.lasaWarnings.length > 0 && (
            <>
              <dt className="font-medium text-text-muted">易混淆藥名</dt>
              <dd className="col-span-2 text-warn">
                {card.lasaWarnings.join('、')}
              </dd>
            </>
          )}
        </dl>
      </Card>

      <Card>
        <h2 className="font-semibold">適應症</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.indications.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">禁忌</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.contraindications.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">劑量參考（核對用）</h2>
        <p className="text-xs text-text-muted mt-1">
          僅供與處方雙重核對，不可作為自主給藥依據。
        </p>
        <ul className="mt-2 space-y-2 text-sm">
          {card.doseReference.map((d, i) => (
            <li key={i} className="border-t border-border pt-2 first:border-t-0 first:pt-0">
              <p className="font-medium">
                {d.population} · {ROUTE_LABEL[d.route] ?? d.route}
              </p>
              <p>{d.rangeText}</p>
              <p className="text-xs text-text-muted">{d.note}</p>
            </li>
          ))}
        </ul>
      </Card>

      {card.onsetPeakDuration && (
        <Card>
          <h2 className="font-semibold">起效 / 高峰 / 持續</h2>
          <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
            <div>
              <dt className="text-text-muted">起效</dt>
              <dd>{card.onsetPeakDuration.onset ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-text-muted">高峰</dt>
              <dd>{card.onsetPeakDuration.peak ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-text-muted">持續</dt>
              <dd>{card.onsetPeakDuration.duration ?? '—'}</dd>
            </div>
          </dl>
        </Card>
      )}

      <Card>
        <h2 className="font-semibold">副作用</h2>
        <p className="mt-2 text-sm font-medium text-text-muted">常見</p>
        <ul className="list-disc list-inside text-sm space-y-0.5">
          {card.adverseEffects.common.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
        {card.adverseEffects.serious.length > 0 && (
          <div className="mt-3 rounded-btn bg-critical-soft border border-critical/30 p-2 text-sm">
            <p className="flex items-center gap-1.5 font-semibold text-critical">
              <AlertOctagon className="size-4" aria-hidden />
              嚴重副作用 — 觀察並依規範回報
            </p>
            <ul className="mt-1 list-disc list-inside text-text">
              {card.adverseEffects.serious.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Card>
        <h2 className="font-semibold">護理觀察重點</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {card.monitoring.map((m, i) => (
            <li key={i} className="border-t border-border pt-2 first:border-t-0 first:pt-0">
              <p className="font-medium">{m.parameter}</p>
              <p className="text-text-muted">時機：{m.trigger}</p>
              <p className="text-text-muted">→ {m.actionHint}</p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold">護理注意</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.nursingConsiderations.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </Card>

      {card.interactionsBrief && card.interactionsBrief.length > 0 && (
        <Card>
          <h2 className="font-semibold">常見交互作用（學習用）</h2>
          <p className="text-xs text-text-muted mt-1">
            僅作學習參考，不作為臨床交互作用判定。
          </p>
          <ul className="mt-2 list-disc list-inside text-sm space-y-1">
            {card.interactionsBrief.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </Card>
      )}

      {(card.storage || card.appearance) && (
        <Card>
          <h2 className="font-semibold">保存 / 外觀</h2>
          <dl className="mt-2 text-sm space-y-1">
            {card.storage && (
              <div>
                <dt className="font-medium text-text-muted">保存</dt>
                <dd>{card.storage}</dd>
              </div>
            )}
            {card.appearance && (
              <div>
                <dt className="font-medium text-text-muted">外觀</dt>
                <dd>{card.appearance}</dd>
              </div>
            )}
          </dl>
        </Card>
      )}
    </div>
  );
}
