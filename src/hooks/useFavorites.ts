'use client';
import { useState, useEffect, useCallback } from 'react';
import { FavoriteLocation } from '@/types';
import { getFavorites, addFavorite, removeFavorite } from '@/services/api';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch {
      // Server may not be available
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = useCallback(async (name: string, lat: number, lon: number) => {
    try {
      const fav = await addFavorite(name, lat, lon);
      setFavorites(prev => [...prev, fav]);
      return fav;
    } catch (e: any) {
      if (e.message?.includes('already in favorites')) return null;
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    await removeFavorite(id);
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, []);

  return { favorites, loading, add, remove, reload: load };
}
