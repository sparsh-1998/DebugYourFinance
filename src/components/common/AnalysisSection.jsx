export default function AnalysisSection({ title, children, variant = 'default' }) {
  // Different color schemes based on calculator type
  const variantStyles = {
    default: 'from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20 border-accent/20 dark:border-accent/30',
    warning: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-700',
    info: 'from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-700'
  };

  return (
    <div className={`bg-gradient-to-br rounded-lg p-6 border-2 ${variantStyles[variant]}`}>
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
        {title}
      </h3>
      <div className="text-slate-700 dark:text-slate-300 space-y-4">
        {children}
      </div>
    </div>
  );
}
