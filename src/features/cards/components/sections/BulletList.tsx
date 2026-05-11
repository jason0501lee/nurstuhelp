interface BulletListProps {
  items: readonly string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="list-disc list-inside space-y-1 text-sm leading-snug">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
