import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { HealthEduCard } from '@/types/cards/healthEdu';

interface HealthEduBodyProps {
  card: HealthEduCard;
}

export function HealthEduBody({ card }: HealthEduBodyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.explainIn30s);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-semibold">核心訊息</h2>
        <ol className="mt-2 list-decimal list-inside text-sm space-y-1">
          {card.keyMessages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ol>
      </Card>

      <Card className="border-primary/30">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-primary">30 秒口語版（對病人講）</h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            leadingIcon={
              copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )
            }
          >
            {copied ? '已複製' : '複製'}
          </Button>
        </div>
        <p className="text-sm mt-2 leading-relaxed whitespace-pre-line">
          {card.explainIn30s}
        </p>
        <p className="text-xs text-text-muted mt-2">
          進行衛教前請與帶教老師或團隊確認本案個別差異與醫囑。
        </p>
      </Card>

      <Card>
        <h2 className="font-semibold">回問病人（teach-back）</h2>
        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
          {card.teachBackQuestions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </Card>

      {card.commonMisconceptions && card.commonMisconceptions.length > 0 && (
        <Card>
          <h2 className="font-semibold">常見誤解</h2>
          <ul className="mt-2 list-disc list-inside text-sm space-y-1 text-text-muted">
            {card.commonMisconceptions.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </Card>
      )}

      {card.doAndDont && (
        <Card>
          <h2 className="font-semibold">建議與避免</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div>
              <h3 className="text-sm font-semibold text-success mb-1">建議</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {card.doAndDont.do.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-critical mb-1">避免</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {card.doAndDont.dont.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
