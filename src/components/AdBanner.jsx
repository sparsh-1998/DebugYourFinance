export default function AdBanner({ position = 'horizontal', height = 'auto' }) {
  const heightClass = height === 'auto'
    ? (position === 'horizontal' ? 'min-h-[200px]' : 'min-h-[150px]')
    : height;

  return (
    <div
      className={`${heightClass} w-full border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center`}
      role="complementary"
      aria-label="Advertisement"
    >
      <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">
        Advertisement
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {position === 'horizontal' ? '728 × 90' : '300 × 250'}
      </p>
    </div>
  );
}
