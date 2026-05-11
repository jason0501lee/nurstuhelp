import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { Card, CardType } from '@/types/card';
import { getCardRepository } from '@/repositories';
import { useTrackOpen } from '@/features/recents/hooks/useTrackOpen';

import { CardHeader } from '@/features/cards/components/CardHeader';
import { CautionList } from '@/features/cards/components/CautionList';
import { RedFlagList } from '@/features/cards/components/RedFlagList';
import { BodySections } from '@/features/cards/components/BodySectionRenderer';
import { ReferencesAccordion } from '@/features/cards/components/ReferencesAccordion';
import { ReviewMetaFootnote } from '@/features/cards/components/ReviewMetaFootnote';
import { ReportContentButton } from '@/features/cards/components/ReportContentButton';
import { RelatedCards } from '@/features/cards/components/RelatedCards';
import { SafetyBanner } from '@/features/safety/components/SafetyBanner';
import { DisclaimerBlock } from '@/features/safety/components/DisclaimerBlock';
import { EmptyState } from '@/components/ui/EmptyState';

import { VitalSignBody } from '@/features/cards/components/typeSpecific/VitalSignBody';
import { DrugBody } from '@/features/cards/components/typeSpecific/DrugBody';
import { DiseaseBody } from '@/features/cards/components/typeSpecific/DiseaseBody';
import { HealthEduBody } from '@/features/cards/components/typeSpecific/HealthEduBody';
import type { SafetyBannerKey, DiscKey } from '@/features/safety/copy';
import { useCardsByIds } from '@/features/cards/hooks/useCardsByIds';

const SLUG_TO_TYPE: Record<string, CardType> = {
  'vital-signs': 'vital_sign',
  drugs: 'drug',
  diseases: 'disease',
  'health-edu': 'health_edu',
  sop: 'sop',
};

const BACK_PATH: Record<CardType, string> = {
  vital_sign: '/reference/vital-signs',
  drug: '/reference/drugs',
  disease: '/reference/diseases',
  health_edu: '/reference/health-edu',
  sop: '/reference/sop',
  isbar: '/tools',
  med_safety: '/tools',
};

const BACK_LABEL: Record<CardType, string> = {
  vital_sign: '生命徵象',
  drug: '藥物',
  disease: '疾病',
  health_edu: '衛教',
  sop: 'SOP',
  isbar: '工具',
  med_safety: '工具',
};

/** Type → primary safety banner key shown at the top of the page. */
function bannerKeyFor(card: Card): SafetyBannerKey | DiscKey | null {
  switch (card.type) {
    case 'drug':
      return 'SB-1';
    case 'vital_sign':
      return 'SB-3';
    case 'disease':
      return 'SB-8';
    case 'health_edu':
      return 'DISC-EDU';
    default:
      return null;
  }
}

function TypeSpecificBody({ card }: { card: Card }) {
  switch (card.type) {
    case 'vital_sign':
      return <VitalSignBody card={card} />;
    case 'drug':
      return <DrugBody card={card} />;
    case 'disease':
      return <DiseaseBody card={card} />;
    case 'health_edu':
      return <HealthEduBody card={card} />;
    default:
      return null;
  }
}

export default function CardDetailPage() {
  const { typeSlug, slug } = useParams();
  const cardType = typeSlug ? SLUG_TO_TYPE[typeSlug] : undefined;
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!cardType || !slug) {
      setCard(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    void getCardRepository()
      .getBySlug(cardType, slug)
      .then((c) => {
        if (cancelled) return;
        setCard(c);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [cardType, slug]);

  useTrackOpen(card?.id);

  const relatedCards = useCardsByIds(card?.relatedCardIds ?? []);

  if (loading) {
    return <p className="p-4 text-sm text-text-muted">載入中⋯</p>;
  }
  if (!card) {
    return (
      <EmptyState
        title="找不到此卡片"
        description="可能已下架或網址有誤。"
        action={
          <Link to="/reference" className="text-primary underline-offset-2 hover:underline">
            回到快查
          </Link>
        }
      />
    );
  }

  const bannerKey = bannerKeyFor(card);

  return (
    <article className="p-4 space-y-4">
      <Link
        to={BACK_PATH[card.type]}
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>{BACK_LABEL[card.type]}</span>
      </Link>

      <CardHeader card={card} />

      {bannerKey && <SafetyBanner kind={bannerKey} />}

      <p className="text-sm text-text leading-relaxed">{card.shortSummary}</p>

      {card.caution.length > 0 && <CautionList cautions={card.caution} />}
      {card.redFlags && card.redFlags.length > 0 && (
        <RedFlagList redFlags={card.redFlags} />
      )}

      <TypeSpecificBody card={card} />

      <BodySections sections={card.bodySections} show="all" />

      <RelatedCards cards={relatedCards} />

      <ReferencesAccordion references={card.references} />

      <DisclaimerBlock kind="DISC-CARD-BASE" collapsible defaultOpen={false} />

      <ReviewMetaFootnote card={card} />

      <div className="flex justify-end">
        <ReportContentButton cardId={card.id} />
      </div>
    </article>
  );
}
