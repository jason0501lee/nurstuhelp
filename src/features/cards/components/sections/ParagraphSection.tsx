interface ParagraphSectionProps {
  text: string;
}

export function ParagraphSection({ text }: ParagraphSectionProps) {
  return (
    <p className="text-sm leading-relaxed text-text whitespace-pre-line">
      {text}
    </p>
  );
}
