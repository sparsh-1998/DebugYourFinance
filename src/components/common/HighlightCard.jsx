/**
 * Reusable highlight/savings card with gradient background
 */
export default function HighlightCard({
  title,
  items = [],
  gradient = 'from-accent to-emerald-600',
  className = ''
}) {
  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-lg p-6 text-white ${className}`}>
      {title && <h4 className="text-lg font-semibold mb-4">{title}</h4>}
      <div className={`grid grid-cols-1 ${items.length > 1 ? 'md:grid-cols-2' : ''} gap-4`}>
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-emerald-100 mb-1">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
