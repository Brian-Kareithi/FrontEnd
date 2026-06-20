'use client';
import { useState, FormEvent } from 'react';

interface Props {
  onSearch: (lat: number, lon: number, name: string) => void;
  onUseLocation: () => void;
  geoLoading: boolean;
}

export default function SearchBar({ onSearch, onUseLocation, geoLoading }: Props) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const loc = data.results[0];
        const name = [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ');
        onSearch(loc.latitude, loc.longitude, name);
      }
    } catch {
      // fallback
    } finally {
      setSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-weather-500 focus:border-transparent text-sm"
        />
        {searching && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            ...
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={searching || !query.trim()}
        className="px-4 py-2.5 rounded-lg bg-weather-600 text-white text-sm font-medium hover:bg-weather-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    </form>
  );
}
