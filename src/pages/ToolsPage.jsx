import { useState, lazy, Suspense, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CalculatorSkeleton } from '../components/common';
import AdBanner from '../components/features/AdBanner';

// Lazy load calculator components
const SIPCalculator = lazy(() => import('../components/calculators/SIPCalculator'));
const SWPCalculator = lazy(() => import('../components/calculators/SWPCalculator'));
const TaxRegimeSimulator = lazy(() => import('../components/calculators/TaxRegimeSimulator'));
const LoanTenureReducer = lazy(() => import('../components/calculators/LoanTenureReducer'));
const RentVsBuyCalculator = lazy(() => import('../components/calculators/RentVsBuyCalculator'));
const CarAffordabilityCalculator = lazy(() => import('../components/calculators/CarAffordabilityCalculator'));

export default function ToolsPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();

  const tools = [
    { id: 'sip', name: 'SIP Calculator', component: SIPCalculator },
    { id: 'swp', name: 'SWP Generator', component: SWPCalculator },
    { id: 'tax', name: 'Tax Simulator', component: TaxRegimeSimulator },
    { id: 'loan', name: 'Loan Reducer', component: LoanTenureReducer },
    { id: 'rent-vs-buy', name: 'Rent vs Buy', component: RentVsBuyCalculator },
    { id: 'car', name: 'Car Affordability Check', component: CarAffordabilityCalculator },
  ];

  const validToolIds = ['sip', 'swp', 'tax', 'loan', 'rent-vs-buy', 'car'];
  const defaultTab = 'sip';

  const initialTab = toolId && validToolIds.includes(toolId) ? toolId : defaultTab;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Handle URL changes
  useEffect(() => {
    if (!toolId) {
      navigate(`/tools/${defaultTab}`, { replace: true });
    } else if (!validToolIds.includes(toolId)) {
      navigate(`/tools/${defaultTab}`, { replace: true });
    } else if (toolId !== activeTab) {
      setActiveTab(toolId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId, navigate]);


  const ActiveToolComponent = tools.find(t => t.id === activeTab)?.component;

  const toolMetaData = {
    sip: {
      title: 'SIP Calculator - Plan Your Systematic Investment | DebugYourFinance',
      description: 'Calculate your SIP returns with our free SIP calculator. Plan your mutual fund investments with step-up SIP options and detailed projections.',
    },
    swp: {
      title: 'SWP Calculator - Systematic Withdrawal Planner | DebugYourFinance',
      description: 'Plan your retirement income with our SWP calculator. Calculate systematic withdrawal plans from mutual funds with tax efficiency.',
    },
    tax: {
      title: 'Tax Regime Simulator - Compare Old vs New Tax Regime | DebugYourFinance',
      description: 'Compare old and new tax regimes in India. Calculate income tax, deductions, and find which tax regime saves you more money.',
    },
    loan: {
      title: 'Loan Tenure Reducer - EMI & Prepayment Calculator | DebugYourFinance',
      description: 'Reduce your loan tenure with smart prepayments. Calculate EMI, interest savings, and loan closure strategies.',
    },
    'rent-vs-buy': {
      title: 'Rent vs Buy Calculator - Home Buying Decision Tool | DebugYourFinance',
      description: 'Should you rent or buy a home? Compare costs, investments, and make informed real estate decisions with our calculator.',
    },
    car: {
      title: '20/4/10 Car Affordability Calculator - Smart Car Buying | DebugYourFinance',
      description: 'Calculate if you can afford a car using the 20/4/10 rule. Check EMI, running costs, and ensure your car purchase fits your budget.',
    },
  };

  const currentToolMeta = toolMetaData[activeTab] || toolMetaData.sip;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tools.find(t => t.id === activeTab)?.name,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": currentToolMeta.description,
    "url": `https://debugyourfinance.com/tools/${activeTab}`
  };

  return (
    <>
      <Helmet>
        <title>{currentToolMeta.title}</title>
        <meta name="description" content={currentToolMeta.description} />
        <link rel="canonical" href={`https://debugyourfinance.com/tools/${activeTab}`} />
        <meta property="og:url" content={`https://debugyourfinance.com/tools/${activeTab}`} />
        <meta property="og:title" content={currentToolMeta.title} />
        <meta property="og:description" content={currentToolMeta.description} />
        <meta property="twitter:url" content={`https://debugyourfinance.com/tools/${activeTab}`} />
        <meta property="twitter:title" content={currentToolMeta.title} />
        <meta property="twitter:description" content={currentToolMeta.description} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

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
                onClick={() => {
                  setActiveTab(tool.id);
                  navigate(`/tools/${tool.id}`);
                }}
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

          <div className="mb-8">
            <AdBanner />
          </div>

          <Suspense fallback={<CalculatorSkeleton />}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {ActiveToolComponent && <ActiveToolComponent />}
            </motion.div>
          </Suspense>

          <div className="mt-8">
            <AdBanner />
          </div>
        </div>
      </section>
    </motion.div>
    </>
  );
}
