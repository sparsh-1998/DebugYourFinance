/**
 * Loading skeleton component for better UX than spinners
 */

export function CalculatorSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Title skeleton */}
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
      
      {/* Input fields skeleton */}
      <div className="space-y-4 mt-8">
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
      
      {/* Results cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
      
      {/* Chart skeleton */}
      <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded mt-6"></div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto mb-8"></div>
        <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  );
}

export default CalculatorSkeleton;
