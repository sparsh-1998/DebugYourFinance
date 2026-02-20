/**
 * Displays a mathematical formula in a styled box
 * @param {string} formula - The formula to display
 */
export default function FormulaBox({ formula }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded p-4 font-mono text-sm overflow-x-auto border-2 border-slate-200 dark:border-slate-600">
      {formula}
    </div>
  );
}
