import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
}

/**
 * Read-only search affordance used on HomePage. Tapping anywhere on
 * it navigates to /search, which owns the live search input. Keeping
 * the home page input dummy avoids fighting iOS auto-focus + keyboard
 * pop on every visit.
 */
export function SearchBar({
  placeholder = '搜尋藥名 / 數值 / SOP / 量表…',
}: SearchBarProps) {
  return (
    <Link
      to="/search"
      className="flex items-center gap-2 h-12 px-3 rounded-btn bg-surface border border-border text-text-muted hover:bg-bg"
      aria-label="開啟搜尋"
    >
      <Search className="size-5 shrink-0" aria-hidden />
      <span className="text-sm truncate">{placeholder}</span>
    </Link>
  );
}
