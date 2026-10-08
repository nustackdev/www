import type { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import s from './SearchInput.module.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
}

/** SearchInput — mono search box with a leading magnifier icon.
 *  Used by catalogue pages that filter by query. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
}: SearchInputProps) {
  const cls = [s.wrap, className].filter(Boolean).join(' ');
  return (
    <label className={cls}>
      <Search size={16} aria-hidden className={s.icon} />
      <input
        type="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={s.input}
        aria-label={ariaLabel}
      />
    </label>
  );
}
