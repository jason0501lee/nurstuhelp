import type { ReviewMeta } from '@/types/safety';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import { isCardStale } from '@/types/card';
import type { Card } from '@/types/card';

interface ReviewMetaFootnoteProps {
  card: Card;
}

function formatDate(iso: string): string {
  // Accept either YYYY-MM-DD or full ISO datetime.
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

/**
 * Tiny footnote-style block at the bottom of a card detail. Shows
 * the review version + next-review-due date. When the card is stale
 * (next_review_due in the past) we render SB-10 above the footnote.
 */
export function ReviewMetaFootnote({ card }: ReviewMetaFootnoteProps) {
  const stale = isCardStale(card);
  const r: ReviewMeta = card.review;
  return (
    <>
      {stale && <SafetyBanner kind="SB-10" className="mb-2" />}
      <p className="text-xs text-text-muted px-1">
        內容版本 v{r.version}　·
        {r.approvedAt ? `審稿 ${formatDate(r.approvedAt)}　·　` : ''}
        下次審稿 {formatDate(r.nextReviewDue)}
      </p>
    </>
  );
}
