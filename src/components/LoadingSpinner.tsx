'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-weather-200 dark:border-slate-600 border-t-weather-600 dark:border-t-weather-400 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 dark:text-slate-500">Loading weather data...</p>
      </div>
    </div>
  );
}
