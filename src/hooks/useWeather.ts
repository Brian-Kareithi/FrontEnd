'use client';
import { useState, useCallback } from 'react';
import { WeatherResponse, FarmerAdvisory } from '@/types';
import { getWeather, getAdvisory } from '@/services/api';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [advisory, setAdvisory] = useState<FarmerAdvisory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (lat: number, lon: number, days = 7) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(lat, lon, days);
      setWeather(data);
      return data;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAdvisory = useCallback(async (lat: number, lon: number, cropType: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdvisory(lat, lon, cropType);
      setAdvisory(data);
      return data;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setWeather(null);
    setAdvisory(null);
    setError(null);
  }, []);

  return { weather, advisory, loading, error, fetchWeather, fetchAdvisory, clear };
}
