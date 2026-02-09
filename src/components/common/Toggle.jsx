/**
 * Reusable toggle switch component
 */
export default function Toggle({
  label,
  description,
  badge,
  enabled,
  onToggle,
  className = ''
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <span>{label}</span>
          {badge && (
            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </label>
        {description && <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
          enabled ? 'bg-accent' : 'bg-slate-300 dark:bg-slate-600'
        } ${className}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
