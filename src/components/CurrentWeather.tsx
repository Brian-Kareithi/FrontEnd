'use client';
import { CurrentWeather as CurrentWeatherType } from '@/types';

interface Props {
  data: CurrentWeatherType;
  locationName: string;
  lastUpdated: string;
}

const WEATHER_ICONS: Record<string, string> = {
  '01d': '\u2600', '01n': '\u263D',
  '02d': '\u2601', '02n': '\u2601',
  '03d': '\u2601', '03n': '\u2601',
  '04d': '\u2601', '04n': '\u2601',
  '09d': '\uD83C\uDF27', '09n': '\uD83C\uDF27',
  '10d': '\uD83C\uDF26', '10n': '\uD83C\uDF26',
  '11d': '\u26C8', '11n': '\u26C8',
  '13d': '\u2744', '13n': '\u2744',
  '50d': '\uD83C\uDF2B', '50n': '\uD83C\uDF2B',
};

export default function CurrentWeatherCard({ data, locationName, lastUpdated }: Props) {
  const icon = WEATHER_ICONS[data.icon] || '\u2600';
  const time = new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{locationName}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Updated {time}</p>
          <p className="text-5xl font-bold text-slate-900 dark:text-slate-100 mt-4">
            {Math.round(data.temp)}&deg;C
          </p>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-1 capitalize">{data.condition}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Feels like {Math.round(data.feels_like)}&deg;C
          </p>
        </div>
        <span className="text-6xl">{icon}</span>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{data.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Wind</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{data.wind_speed} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Pressure</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{data.pressure} hPa</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">UV</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{data.uv_index}</p>
        </div>
      </div>
    </div>
  );
}
