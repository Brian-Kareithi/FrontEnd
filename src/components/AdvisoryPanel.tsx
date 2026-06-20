'use client';
import { useState } from 'react';
import { FarmerAdvisory } from '@/types';
import RiskBadge from './RiskBadge';

interface Props {
  advisory: FarmerAdvisory;
}

const CROP_EMOJIS: Record<string, string> = {
  maize: '\uD83C\uDF3D',
  tea: '\uD83C\uDF75',
  coffee: '\u2615',
  beans: '\uD83C\uDF31',
};

const RISK_EMOJIS: Record<string, string> = {
  drought: '\uD83C\uDF1E',
  heavy_rain: '\uD83C\uDF27',
  wind: '\uD83D\uDCA8',
  frost: '\u2744',
  heat: '\uD83D\uDD25',
};

const PRIORITY_STYLES: Record<string, string> = {
  info: 'border-l-4 border-l-weather-500',
  warning: 'border-l-4 border-l-advisory-high',
  critical: 'border-l-4 border-l-advisory-extreme bg-red-50 dark:bg-red-900/20',
};

export default function AdvisoryPanel({ advisory }: Props) {
  const [expanded, setExpanded] = useState(false);
  const displayRecs = expanded ? advisory.recommendations : advisory.recommendations.slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{CROP_EMOJIS[advisory.crop_type] || '\uD83C\uDF3E'}</span>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
          {advisory.crop_type} Advisory
        </h3>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {advisory.location.city || `Lat ${advisory.location.lat.toFixed(2)}, Lon ${advisory.location.lon.toFixed(2)}`}
        &nbsp;&middot; Generated {new Date(advisory.generated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>

      {advisory.risks.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Risk Assessment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {advisory.risks.map((risk, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
              >
                <span className="text-base mt-0.5">{RISK_EMOJIS[risk.type] || '\u26A0'}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">{risk.type}</span>
                    <RiskBadge level={risk.level} />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
        Recommendations
      </h4>
      <div className="space-y-2">
        {displayRecs.map((rec, i) => (
          <div key={i} className={`p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 ${PRIORITY_STYLES[rec.priority] || ''}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize">{rec.category}</span>
              {rec.timing && (
                <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded">
                  {rec.timing}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rec.message}</p>
          </div>
        ))}
      </div>

      {advisory.recommendations.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-weather-600 dark:text-weather-400 hover:underline"
        >
          {expanded ? 'Show less' : `Show ${advisory.recommendations.length - 3} more...`}
        </button>
      )}

      {advisory.ai_insight && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs">\uD83E\uDD16</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">AI Insight</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{advisory.ai_insight}</p>
        </div>
      )}
    </div>
  );
}
