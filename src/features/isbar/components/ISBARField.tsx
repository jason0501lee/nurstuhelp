import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import type { ISBARFieldSpec } from '@/types/cards/isbar';
import type { PiiHit } from '@/lib/piiPatterns';
import { PiiInlineWarning } from './PiiInlineWarning';

interface ISBARFieldProps {
  field: ISBARFieldSpec;
  value: string;
  onChange: (value: string) => void;
  piiHits?: PiiHit[];
}

export function ISBARField({
  field,
  value,
  onChange,
  piiHits,
}: ISBARFieldProps) {
  const invalid = (piiHits?.length ?? 0) > 0;

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-text">
        {field.label}
        {field.required && (
          <span aria-label="必填" className="text-critical ml-0.5">
            *
          </span>
        )}
      </span>
      {field.hint && (
        <span className="block text-xs text-text-muted">{field.hint}</span>
      )}
      {field.type === 'multiline' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          invalid={invalid}
          rows={3}
          placeholder={field.hint ?? ''}
        />
      ) : (
        <Input
          type={field.type === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          invalid={invalid}
          placeholder={field.hint ?? ''}
        />
      )}
      {piiHits && <PiiInlineWarning hits={piiHits} />}
    </label>
  );
}
