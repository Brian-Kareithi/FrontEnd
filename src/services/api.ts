import { WeatherResponse, FarmerAdvisory, FavoriteLocation } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export async function getWeather(lat: number, lon: number, days = 7): Promise<WeatherResponse> {
  return fetchJson<WeatherResponse>(`${API_BASE}/weather?lat=${lat}&lon=${lon}&days=${days}`);
}

export async function getAdvisory(
  lat: number,
  lon: number,
  cropType: string
): Promise<FarmerAdvisory> {
  return fetchJson<FarmerAdvisory>(`${API_BASE}/advisory`, {
    method: 'POST',
    body: JSON.stringify({ lat, lon, crop_type: cropType }),
  });
}

export async function getFavorites(): Promise<FavoriteLocation[]> {
  return fetchJson<FavoriteLocation[]>(`${API_BASE}/favorites`);
}

export async function addFavorite(name: string, lat: number, lon: number): Promise<FavoriteLocation> {
  return fetchJson<FavoriteLocation>(`${API_BASE}/favorites`, {
    method: 'POST',
    body: JSON.stringify({ name, lat, lon }),
  });
}

export async function removeFavorite(id: string): Promise<void> {
  await fetchJson<void>(`${API_BASE}/favorites/${id}`, { method: 'DELETE' });
}
