export default function FAQSection({ faqs }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border-2 border-slate-200 dark:border-slate-600">
      <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h4 className="font-semibold text-lg text-primary dark:text-white mb-2">
              {faq.question}
            </h4>
            <p className="text-slate-700 dark:text-slate-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
