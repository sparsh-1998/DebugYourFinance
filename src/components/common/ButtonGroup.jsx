/**
 * Reusable button group component for selecting between options
 */
export default function ButtonGroup({
  options,
  selected,
  onSelect,
  className = ''
}) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selected === option.value
              ? 'bg-accent text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
