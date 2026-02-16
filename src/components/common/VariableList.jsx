/**
 * Displays a list of variable definitions (e.g., "Where: FV = Future Value...")
 * @param {Array} variables - Array of {symbol, description} objects
 */
export default function VariableList({ variables }) {
  return (
    <div className="text-sm space-y-1">
      <p className="font-semibold">Where:</p>
      <ul className="list-none space-y-1 ml-4">
        {variables.map((variable, index) => (
          <li key={index}>
            <span className="font-mono font-semibold">{variable.symbol}</span> = {variable.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
