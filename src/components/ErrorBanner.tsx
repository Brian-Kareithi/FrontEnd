'use client';

interface Props {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorBanner({ message, onDismiss }: Props) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
      <div className="flex items-start gap-2">
        <span className="text-red-500 text-sm mt-0.5">\u26A0</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-800 dark:text-red-300">Error</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">{message}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-red-400 hover:text-red-600 text-sm">
            \u2715
          </button>
        )}
      </div>
    </div>
  );
}
