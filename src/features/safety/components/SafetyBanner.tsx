import { AlertOctagon, AlertTriangle, Info, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { CautionLevel } from '@/types/dictionaries';
import { cn } from '@/lib/cn';
import {
  DISCLAIMERS,
  SAFETY_BANNERS,
  type DiscKey,
  type SafetyBannerKey,
  type SafetyText,
} from '../copy';

type SafetyBannerProps =
  | {
      kind: SafetyBannerKey | DiscKey;
      level?: never;
      title?: never;
      body?: never;
      footer?: ReactNode;
      className?: string;
    }
  | {
      kind?: never;
      level: CautionLevel;
      title: string;
      body: string | string[];
      footer?: ReactNode;
      className?: string;
    };

const LEVEL_STYLES: Record<
  CautionLevel,
  { container: string; icon: LucideIcon; iconColor: string }
> = {
  info: {
    container: 'bg-info-soft border-info/30 text-info',
    icon: Info,
    iconColor: 'text-info',
  },
  warning: {
    container: 'bg-warn-soft border-warn/30 text-warn',
    icon: AlertTriangle,
    iconColor: 'text-warn',
  },
  critical: {
    container: 'bg-critical-soft border-critical/30 text-critical',
    icon: AlertOctagon,
    iconColor: 'text-critical',
  },
};

function resolveContent(props: SafetyBannerProps): SafetyText {
  if (props.kind) {
    return (
      SAFETY_BANNERS[props.kind as SafetyBannerKey] ??
      DISCLAIMERS[props.kind as DiscKey]
    );
  }
  return { level: props.level, title: props.title, body: props.body };
}

/**
 * Single rendering surface for every Disclaimer / Safety Banner. The
 * level drives the colour and icon; the registry is the only source
 * of authored text. Cannot be styled black/red ad hoc — keeps the
 * safety language consistent across screens (§safety-spec §6).
 *
 * High-risk banners are NOT dismissible by design (FR-G04). To
 * acknowledge inside a flow, wrap a SafetyBanner with a ConfirmGate.
 */
export function SafetyBanner(props: SafetyBannerProps) {
  const content = resolveContent(props);
  const styles = LEVEL_STYLES[content.level];
  const Icon = styles.icon;
  const bodyLines = Array.isArray(content.body) ? content.body : [content.body];

  return (
    <section
      role="note"
      aria-label={content.title}
      className={cn(
        'rounded-card border p-3 flex gap-3',
        styles.container,
        props.className,
      )}
    >
      <Icon className={cn('size-5 shrink-0 mt-0.5', styles.iconColor)} aria-hidden />
      <div className="flex-1 text-sm text-text">
        <p className={cn('font-semibold', styles.iconColor)}>{content.title}</p>
        {bodyLines.length === 1 ? (
          <p className="mt-1 leading-snug">{bodyLines[0]}</p>
        ) : (
          <ul className="mt-1 list-disc list-inside leading-snug space-y-0.5">
            {bodyLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
        {props.footer && <div className="mt-2">{props.footer}</div>}
      </div>
    </section>
  );
}
