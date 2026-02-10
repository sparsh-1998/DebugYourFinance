import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import AdBanner from '../components/AdBanner';

// Lazy load calculator components (they contain heavy Recharts charts)
const SIPCalculator = lazy(() => import('../components/SIPCalculator'));
const SWPCalculator = lazy(() => import('../components/SWPCalculator'));
const TaxRegimeSimulator = lazy(() => import('../components/TaxRegimeSimulator'));
const LoanTenureReducer = lazy(() => import('../components/LoanTenureReducer'));
const RentVsBuyCalculator = lazy(() => import('../components/RentVsBuyCalculator'));

// Loading spinner for calculators
function CalculatorLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  );
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('sip');

  const tools = [
    { id: 'sip', name: 'SIP Calculator', component: SIPCalculator },
    { id: 'swp', name: 'SWP Generator', component: SWPCalculator },
    { id: 'tax', name: 'Tax Simulator', component: TaxRegimeSimulator },
    { id: 'loan', name: 'Loan Reducer', component: LoanTenureReducer },
    { id: 'rent-vs-buy', name: 'Rent vs Buy', component: RentVsBuyCalculator },
  ];

  const ActiveToolComponent = tools.find(t => t.id === activeTab)?.component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="py-20 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary dark:text-white">
            Financial Tools
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tool.id
                    ? 'bg-accent text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-primary dark:text-white hover:shadow-md'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>

          {/* Ad Banner Above Calculator */}
          <div className="mb-8">
            <AdBanner />
          </div>

          {/* Active Calculator */}
          <Suspense fallback={<CalculatorLoader />}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {ActiveToolComponent && <ActiveToolComponent />}
            </motion.div>
          </Suspense>

          {/* Ad Banner Below Calculator */}
          <div className="mt-8">
            <AdBanner />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
