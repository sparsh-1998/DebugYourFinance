export default function HowToUseSection({ steps }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
        How to Use This Tool
      </h3>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300">
        {steps.map((step, index) => (
          <li key={index}>
            <strong>{step.title}</strong> - {step.description}
          </li>
        ))}
      </ol>
    </div>
  );
}
