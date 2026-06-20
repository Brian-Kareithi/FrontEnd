'use client';
import { FavoriteLocation } from '@/types';

interface Props {
  favorites: FavoriteLocation[];
  onSelect: (fav: FavoriteLocation) => void;
  onRemove: (id: string) => void;
}

export default function FavoritesList({ favorites, onSelect, onRemove }: Props) {
  if (favorites.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
      <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
        Saved Locations
      </h3>
      <div className="space-y-1">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group"
            onClick={() => onSelect(fav)}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{fav.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {fav.lat.toFixed(2)}, {fav.lon.toFixed(2)}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(fav.id); }}
              className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all text-sm p-1"
              title="Remove"
            >
              \u2715
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
