'use client';
import { useState, useEffect, useRef } from 'react';

interface Suggestion {
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
  display: string;
}

interface Props {
  onSearch: (lat: number, lon: number, name: string) => void;
  onUseLocation: () => void;
  geoLoading: boolean;
}

export default function SearchBar({ onSearch, onUseLocation, geoLoading }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchSuggestions = async (q: string) => {
    if (q.trim().length < 2) { setSuggestions([]); setOpen(false); return; }
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`
      );
      const data = await res.json();
      const results: Suggestion[] = (data.results || []).map((r: any) => ({
        name: r.name,
        admin1: r.admin1,
        country: r.country,
        latitude: r.latitude,
        longitude: r.longitude,
        display: [r.name, r.admin1, r.country].filter(Boolean).join(', '),
      }));
      setSuggestions(results);
      setOpen(results.length > 0);
      setActiveIdx(-1);
    } catch { /* ignore */ }
  };

  const onChange = (val: string) => {
    setQuery(val);
    setActiveIdx(-1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchSuggestions(val), 250);
  };

  const select = (s: Suggestion) => {
    setQuery(s.display);
    setOpen(false);
    setSuggestions([]);
    onSearch(s.latitude, s.longitude, s.display);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); select(suggestions[activeIdx]); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="flex gap-2">
      <div ref={ref} className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          placeholder="Search city..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-weather-500 focus:border-transparent text-sm"
        />
        {open && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden z-20">
            {suggestions.map((s, i) => (
              <li
                key={`${s.latitude}-${s.longitude}-${i}`}
                onClick={() => select(s)}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  i === activeIdx
                    ? 'bg-weather-50 dark:bg-weather-900/30 text-weather-700 dark:text-weather-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                {s.display}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        onClick={() => { if (query.trim()) onChange(query); }}
        className="px-4 py-2.5 rounded-lg bg-weather-600 text-white text-sm font-medium hover:bg-weather-700 transition-colors"
      >
        Search
      </button>
      <button
        type="button"
        onClick={onUseLocation}
        disabled={geoLoading}
        className="px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 text-sm transition-colors"
        title="Use current location"
      >
        {geoLoading ? '...' : '\u2316'}
      </button>
    </div>
  );
}
