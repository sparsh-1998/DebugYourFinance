/**
 * Reusable info/note box component with different variants
 */
export default function InfoBox({
  children,
  variant = 'info',
  icon: Icon,
  className = ''
}) {
  const variantStyles = {
    info: 'bg-accent/5 dark:bg-accent/10 border-accent/20 dark:border-accent/30 text-slate-600 dark:text-slate-400',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-400 text-red-700 dark:text-red-400',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600 text-green-700 dark:text-green-400',
    gradient: 'bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 border-accent/20 dark:border-accent/30 text-slate-600 dark:text-slate-400'
  };

  return (
    <div className={`rounded-lg p-3 border ${variantStyles[variant]} ${className}`}>
      {Icon && (
        <div className="flex items-start space-x-2">
          <Icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">{children}</div>
        </div>
      )}
      {!Icon && <div className="text-xs">{children}</div>}
    </div>
  );
}
