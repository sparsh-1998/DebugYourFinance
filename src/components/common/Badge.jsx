/**
 * Reusable badge component for labels and tags
 */
export default function Badge({ label, variant = 'blue', className = '' }) {
  const variants = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <span className={`${variants[variant]} text-white px-2 py-1 rounded text-sm font-medium ${className}`}>
      {label}
    </span>
  );
}
