import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ReportContentButtonProps {
  cardId: string;
  onReport?: (cardId: string) => void;
}

/**
 * Lightweight "report content" affordance per FR-C08. In MVP this is
 * a UI hook only — Step 13 wires the actual report dialog. Per
 * safety governance, the report payload must NEVER include PII.
 */
export function ReportContentButton({
  cardId,
  onReport,
}: ReportContentButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      leadingIcon={<Flag className="size-4" />}
      onClick={() => onReport?.(cardId)}
      className="text-text-muted"
    >
      回報內容
    </Button>
  );
}
