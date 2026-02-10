/**
 * Wrapper component for calculator cards with consistent styling
 */
export default function CalculatorCard({ children }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
      {children}
    </div>
  );
}
