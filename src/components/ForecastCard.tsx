'use client';
import { DailyForecast } from '@/types';

interface Props {
  forecast: DailyForecast[];
}

const ICONS: Record<string, string> = {
  '01d': '\u2600', '01n': '\u263D',
  '02d': '\u26C5', '02n': '\u26C5',
  '03d': '\u2601', '03n': '\u2601',
  '04d': '\u2601', '04n': '\u2601',
  '09d': '\uD83C\uDF27', '09n': '\uD83C\uDF27',
  '10d': '\uD83C\uDF26', '10n': '\uD83C\uDF26',
  '11d': '\u26C8', '11n': '\u26C8',
  '13d': '\u2744', '13n': '\u2744',
  '50d': '\uD83C\uDF2B', '50n': '\uD83C\uDF2B',
};

function dayName(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  const diff = Math.round((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return d.toLocaleDateString('en', { weekday: 'short' });
}

export default function ForecastCard({ forecast }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 px-5 pt-4 pb-2">
        7-Day Forecast
      </h3>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {forecast.map((day, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <span className="w-16 text-sm font-medium text-slate-700 dark:text-slate-300">
              {dayName(day.date)}
            </span>
            <span className="text-xl w-8 text-center">{ICONS[day.icon] || '\u2600'}</span>
            <span className="flex-1 text-xs text-slate-500 dark:text-slate-400 capitalize">{day.condition}</span>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-900 dark:text-slate-100 w-8 text-right">
                {Math.round(day.temp_max)}&deg;
              </span>
              <span className="text-slate-400 dark:text-slate-500 w-8 text-right">
                {Math.round(day.temp_min)}&deg;
              </span>
            </div>
            {day.rain > 0 && (
              <span className="text-xs text-weather-600 dark:text-weather-400 w-10 text-right">
                {day.rain.toFixed(1)}mm
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
