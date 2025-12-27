'use client';

import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100">
      <Search className="h-5 w-5 text-primary-500" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none"
      />
    </label>
  );
}
