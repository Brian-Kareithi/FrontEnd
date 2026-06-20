'use client';
import { useState, useCallback, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import CurrentWeatherCard from '@/components/CurrentWeather';
import ForecastCard from '@/components/ForecastCard';
import ForecastChart from '@/components/ForecastChart';
import AiSummary from '@/components/AiSummary';
import AdvisoryPanel from '@/components/AdvisoryPanel';
import FavoritesList from '@/components/FavoritesList';
import DarkModeToggle from '@/components/DarkModeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBanner from '@/components/ErrorBanner';
import { useWeather } from '@/hooks/useWeather';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useFavorites } from '@/hooks/useFavorites';
import { useDarkMode } from '@/hooks/useDarkMode';
import { FavoriteLocation } from '@/types';

const CROPS = ['maize', 'tea', 'coffee', 'beans'];

export default function Home() {
  const { dark, toggle, mounted } = useDarkMode();
  const { weather, advisory, loading, error, fetchWeather, fetchAdvisory, clear } = useWeather();
  const geo = useGeolocation();
  const { favorites, add: addFavorite, remove: removeFavorite } = useFavorites();
  const [locationName, setLocationName] = useState('Nairobi, Kenya');
  const [coords, setCoords] = useState({ lat: -1.2921, lon: 36.8219 });
  const [cropType, setCropType] = useState('maize');
  const [showAdvisory, setShowAdvisory] = useState(false);

  const loadWeather = useCallback(async (lat: number, lon: number, name: string) => {
    setCoords({ lat, lon });
    setLocationName(name);
    const w = await fetchWeather(lat, lon);
    return w;
  }, [fetchWeather]);

  const handleSearch = useCallback((lat: number, lon: number, name: string) => {
    clear();
    loadWeather(lat, lon, name);
  }, [loadWeather, clear]);

  const handleUseLocation = useCallback(() => {
    geo.requestLocation();
  }, [geo]);

  useEffect(() => {
    if (geo.lat !== null && geo.lon !== null) {
      loadWeather(geo.lat, geo.lon, 'Current Location');
    }
  }, [geo.lat, geo.lon, loadWeather]);

  const handleRunAdvisory = useCallback(async () => {
    if (!weather) return;
    await fetchAdvisory(coords.lat, coords.lon, cropType);
    setShowAdvisory(true);
  }, [weather, coords, cropType, fetchAdvisory]);

  const handleFavoriteSelect = useCallback((fav: FavoriteLocation) => {
    loadWeather(fav.lat, fav.lon, fav.name);
  }, [loadWeather]);

  const handleSaveFavorite = useCallback(() => {
    addFavorite(locationName, coords.lat, coords.lon);
  }, [locationName, coords, addFavorite]);

  const isFavorite = favorites.some(f => f.lat === coords.lat && f.lon === coords.lon);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">\u2601</span>
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">WeatherAI</h1>
          </div>
          <DarkModeToggle dark={dark} onToggle={toggle} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Search */}
        <section className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            geoLoading={geo.loading}
          />
        </section>

        {error && (
          <section className="mb-6">
            <ErrorBanner message={error} onDismiss={clear} />
          </section>
        )}

        {loading && <LoadingSpinner />}

        {weather && !loading && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
              {/* Current Weather */}
              <div className="lg:col-span-2">
                <CurrentWeatherCard
                  data={weather.current}
                  locationName={locationName}
                  lastUpdated={weather.last_updated}
                />
              </div>

              {/* Favorites + Save */}
              <div className="space-y-3">
                <FavoritesList
                  favorites={favorites}
                  onSelect={handleFavoriteSelect}
                  onRemove={removeFavorite}
                />
                {!isFavorite && (
                  <button
                    onClick={handleSaveFavorite}
                    className="w-full py-2.5 px-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400 hover:border-weather-500 hover:text-weather-600 dark:hover:text-weather-400 transition-colors"
                  >
                    + Save current location
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
              {/* 7-Day Forecast */}
              <div className="lg:col-span-1">
                <ForecastCard forecast={weather.forecast} />
              </div>

              {/* Charts */}
              <div className="lg:col-span-2">
                <ForecastChart forecast={weather.forecast} />
              </div>
            </div>

            {/* AI Summary */}
            <div className="mb-5">
              <AiSummary summary={weather.ai_summary} />
            </div>

            {/* Farmer Advisory */}
            <section className="mb-5">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  \uD83C\uDF3E Smart Farmer Advisory
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Get AI-powered crop recommendations based on weather forecasts for the next 48 hours.
                </p>
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Crop Type
                    </label>
                    <select
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-weather-500"
                    >
                      {CROPS.map((crop) => (
                        <option key={crop} value={crop} className="capitalize">
                          {crop.charAt(0).toUpperCase() + crop.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleRunAdvisory}
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-weather-600 text-white text-sm font-medium hover:bg-weather-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Analyzing...' : 'Generate Advisory'}
                  </button>
                </div>
              </div>
            </section>

            {/* Advisory Results */}
            {showAdvisory && advisory && (
              <section className="mb-5">
                <AdvisoryPanel advisory={advisory} />
              </section>
            )}
          </>
        )}

        {/* Initial state */}
        {!weather && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">\u2601</p>
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Welcome to WeatherAI
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Search for a city or use your current location to view weather data, forecasts, and smart farming recommendations.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-700 py-4 mt-8">
        <p className="text-xs text-center text-slate-400 dark:text-slate-500">
          Powered by WeatherAI API &middot; Built with Next.js &middot; Claire L. Montgomery &lt;claire@weather-ai.co&gt;
        </p>
      </footer>
    </div>
  );
}
