/**
 * Reusable result card component for displaying calculation results
 */
export default function ResultCard({
  label,
  value,
  variant = 'default',
  subtext = '',
  className = ''
}) {
  const variantStyles = {
    default: 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600',
    primary: 'bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary',
    accent: 'bg-accent/10 dark:bg-accent/20 border-accent dark:border-accent',
    success: 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-600',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-600',
  };

  const textStyles = {
    default: 'text-primary dark:text-white',
    primary: 'text-primary dark:text-white',
    accent: 'text-accent',
    success: 'text-primary dark:text-white',
    error: 'text-primary dark:text-white',
  };

  return (
    <div className={`rounded-lg p-4 border-2 ${variantStyles[variant]} ${className}`}>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${textStyles[variant]}`}>{value}</p>
      {subtext && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>}
    </div>
  );
}
