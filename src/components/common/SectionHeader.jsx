/**
 * Reusable section header component with icon and description
 */
export default function SectionHeader({ icon: Icon, title, description, className = '' }) {
  return (
    <div className={`flex items-center space-x-3 mb-6 ${className}`}>
      <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-primary dark:text-white">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}
