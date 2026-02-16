/**
 * Displays a note or warning box
 * @param {string} children - Note content
 * @param {string} type - 'note' or 'warning' (default: 'note')
 */
export default function NoteBox({ children, type = 'note' }) {
  const styles = {
    note: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200'
  };

  return (
    <div className={`mt-4 p-4 rounded-lg border-2 ${styles[type]}`}>
      <p className="text-sm">
        <strong>{type === 'warning' ? '⚠️ Note: ' : '💡 Note: '}</strong>
        {children}
      </p>
    </div>
  );
}
