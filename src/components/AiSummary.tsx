'use client';

interface Props {
  summary: string | null;
}

export default function AiSummary({ summary }: Props) {
  if (!summary) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">\uD83E\uDD16</span>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">AI Weather Summary</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{summary}</p>
    </div>
  );
}
