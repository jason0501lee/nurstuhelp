import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ISBARPreviewProps {
  rendered: string;
  copyBlocked: boolean;
  copyBlockedReason?: string;
}

/**
 * Renders the assembled ISBAR text plus the copy button. When
 * `copyBlocked` is true the button is disabled and the reason hints
 * are shown — this is the "PII gate on output" called out in spec.
 */
export function ISBARPreview({
  rendered,
  copyBlocked,
  copyBlockedReason,
}: ISBARPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copyBlocked) return;
    try {
      await navigator.clipboard.writeText(rendered);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold">通報文字塊（預覽）</h2>
        <Button
          variant={copyBlocked ? 'secondary' : 'primary'}
          size="sm"
          disabled={copyBlocked || !rendered.trim()}
          onClick={handleCopy}
          leadingIcon={
            copied ? <Check className="size-4" /> : <Copy className="size-4" />
          }
        >
          {copied ? '已複製' : '複製'}
        </Button>
      </div>
      {copyBlocked && copyBlockedReason && (
        <p className="text-xs text-critical mt-1">{copyBlockedReason}</p>
      )}
      <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-text bg-bg rounded-btn p-3 border border-border font-mono">
        {rendered.trim() ? rendered : '（依上方欄位填寫即可看到預覽）'}
      </pre>
    </Card>
  );
}
