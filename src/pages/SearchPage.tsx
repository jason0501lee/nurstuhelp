import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, SearchX } from 'lucide-react';
import { SearchInput } from '@/features/search/components/SearchInput';
import { ResultGroup } from '@/features/search/components/ResultGroup';
import { useSearch } from '@/features/search/hooks/useSearch';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import type { Card } from '@/types/card';

const GROUP_ORDER: Card['type'][] = [
  'drug',
  'vital_sign',
  'disease',
  'health_edu',
  'med_safety',
  'isbar',
  'sop',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { hits, loading } = useSearch(query);

  const grouped = useMemo(() => {
    const map = new Map<Card['type'], Card[]>();
    for (const hit of hits) {
      const list = map.get(hit.card.type) ?? [];
      list.push(hit.card);
      map.set(hit.card.type, list);
    }
    return map;
  }, [hits]);

  const trimmed = query.trim();

  return (
    <div className="p-4 space-y-4">
      <Link
        to="/"
        className="inline -ml-2 inline-flex items-center gap-1 text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft className="size-4" />
        <span>首頁</span>
      </Link>

      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClear={() => setQuery('')}
        placeholder="藥名 / 數值 / SOP / 量表…"
      />

      {trimmed === '' ? (
        <p className="text-sm text-text-muted px-1">
          試試 <span className="font-mono">lasix</span>、
          <span className="font-mono">furosemide</span>、
          <span className="font-mono">高血壓</span>、
          <span className="font-mono">HR</span>。同義詞 / 商品名 / 別名都可以。
        </p>
      ) : loading ? (
        <p className="text-sm text-text-muted px-1">搜尋中⋯</p>
      ) : hits.length === 0 ? (
        <EmptyState
          icon={<SearchX className="size-10" />}
          title={`找不到「${trimmed}」`}
          description="可能是這個內容尚未加入。可以回報內容缺漏，我們會收進下一輪內容更新。"
          action={
            <Button variant="secondary" size="sm">
              回報缺漏內容
            </Button>
          }
        />
      ) : (
        <div className="space-y-5">
          {GROUP_ORDER.map((type) => (
            <ResultGroup
              key={type}
              type={type}
              cards={grouped.get(type) ?? []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
