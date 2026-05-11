import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { SAFETY_BANNERS, type SafetyBannerKey } from '../copy';

interface ConfirmGateProps {
  open: boolean;
  /** Banner key that names this gate (e.g. SB-4 for MedCheck start). */
  bannerKey: SafetyBannerKey;
  /** Affirmative button label. Defaults to "開始". */
  confirmLabel?: string;
  /** Cancel button label. Defaults to "取消". */
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  /**
   * Optional override of confirmation checkpoints. When omitted, the
   * registered banner body becomes the checklist of must-confirms.
   */
  checkpoints?: string[];
}

/**
 * Modal gate used by safety flows. Cannot be dismissed via ESC or
 * backdrop (FR-G04 / AC-02) — the user must either tick every
 * checkpoint and confirm, or cancel.
 */
export function ConfirmGate({
  open,
  bannerKey,
  confirmLabel = '開始',
  cancelLabel = '取消',
  onConfirm,
  onCancel,
  checkpoints,
}: ConfirmGateProps) {
  const banner = SAFETY_BANNERS[bannerKey];
  const items = useMemo<string[]>(() => {
    if (checkpoints?.length) return checkpoints;
    return Array.isArray(banner.body) ? banner.body : [banner.body];
  }, [banner.body, checkpoints]);

  const [checked, setChecked] = useState<boolean[]>(() =>
    items.map(() => false),
  );

  // Reset when items change or the gate re-opens.
  useEffect(() => {
    if (open) {
      setChecked(items.map(() => false));
    }
  }, [open, items]);

  const allChecked = checked.every(Boolean);
  const tone =
    banner.level === 'critical'
      ? 'critical'
      : banner.level === 'warning'
        ? 'warn'
        : 'neutral';

  return (
    <Modal
      open={open}
      onClose={onCancel}
      dismissible={false}
      showClose={false}
      title={banner.title}
      tone={tone}
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={banner.level === 'critical' ? 'critical' : 'primary'}
            disabled={!allChecked}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <ul className="space-y-1">
        {items.map((label, i) => (
          <li key={i}>
            <Checkbox
              label={label}
              checked={checked[i] ?? false}
              onChange={(e) =>
                setChecked((prev) => {
                  const next = [...prev];
                  next[i] = e.target.checked;
                  return next;
                })
              }
            />
          </li>
        ))}
      </ul>
    </Modal>
  );
}
