'use client';
import { DailyForecast } from '@/types';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts';

interface Props {
  forecast: DailyForecast[];
}

export default function ForecastChart({ forecast }: Props) {
  const data = forecast.map((d) => ({
    day: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    max: Math.round(d.temp_max),
    min: Math.round(d.temp_min),
    rain: Math.round(d.rain * 10) / 10,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs shadow-lg">
        <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-slate-600 dark:text-slate-300">
            {p.name}: {p.value}{p.name === 'rain' ? 'mm' : '\u00B0C'}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Temperature & Rainfall
      </h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis yAxisId="temp" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line yAxisId="temp" type="monotone" dataKey="max" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Max" />
            <Line yAxisId="temp" type="monotone" dataKey="min" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Min" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rain" fill="#60a5fa" radius={[4, 4, 0, 0]} name="rain" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
