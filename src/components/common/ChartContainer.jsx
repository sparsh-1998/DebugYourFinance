/**
 * Reusable chart container component with consistent styling
 */
export default function ChartContainer({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border-2 border-slate-200 dark:border-slate-600 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h4 className="text-lg font-semibold text-primary dark:text-white">
              {title}
              {subtitle && <span className="text-sm text-accent ml-2">{subtitle}</span>}
            </h4>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
