import { Badge, type BadgeTone } from '@/components/ui/Badge';
import { PRIORITY_LABELS } from '@/data/dictionaries';
import type { Priority } from '@/types/dictionaries';

const PRIORITY_TONE: Record<Priority, BadgeTone> = {
  critical: 'critical',
  high: 'warn',
  normal: 'neutral',
  low: 'neutral',
};

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return <Badge tone={PRIORITY_TONE[priority]}>{PRIORITY_LABELS[priority]}</Badge>;
}
