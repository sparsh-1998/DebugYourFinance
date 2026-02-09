/**
 * Reusable comparison card for displaying side-by-side comparisons
 */
export default function ComparisonCard({
  title,
  icon: Icon,
  iconColor = 'text-accent',
  items = [],
  variant = 'default',
  className = ''
}) {
  const variantStyles = {
    default: 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600',
    accent: 'bg-accent/10 dark:bg-accent/20 border-accent dark:border-accent',
    primary: 'bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary'
  };

  return (
    <div className={`rounded-lg p-6 border-2 ${variantStyles[variant]} ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center space-x-2 mb-4">
          {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
          {title && <h4 className="text-lg font-bold text-primary dark:text-white">{title}</h4>}
        </div>
      )}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className={`flex justify-between ${item.bordered ? 'border-t border-slate-300 dark:border-slate-600 pt-2' : ''}`}>
            <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
            <span className={`font-semibold ${item.valueColor || 'dark:text-white'}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
