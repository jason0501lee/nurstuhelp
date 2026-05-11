import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ value, onClear, className, ...rest }, ref) {
    return (
      <div
        className={`flex items-center w-full h-12 rounded-btn bg-surface border border-border px-2 ${className ?? ''}`}
      >
        <Search className="size-5 text-text-muted shrink-0 mx-1" aria-hidden />
        <input
          ref={ref}
          type="search"
          value={value}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none px-1 text-base placeholder:text-text-muted/70"
          {...rest}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="清除"
            className="inline -mr-1 p-2 text-text-muted hover:text-text rounded-btn"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
