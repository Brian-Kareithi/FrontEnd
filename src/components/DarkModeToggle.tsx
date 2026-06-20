'use client';

interface Props {
  dark: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full bg-slate-300 dark:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-weather-500"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-200 text-sm ${
          dark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {dark ? '\u263E' : '\u2600'}
      </span>
    </button>
  );
}
