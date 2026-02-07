import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdBanner from './components/AdBanner';
import SIPCalculator from './components/SIPCalculator';
import TaxRegimeSimulator from './components/TaxRegimeSimulator';
import LoanTenureReducer from './components/LoanTenureReducer';
import InstagramSection from './components/InstagramSection';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('sip');

  const tools = [
    { id: 'sip', name: 'SIP Calculator', component: SIPCalculator },
    { id: 'tax', name: 'Tax Simulator', component: TaxRegimeSimulator },
    { id: 'loan', name: 'Loan Reducer', component: LoanTenureReducer },
  ];

  const ActiveToolComponent = tools.find(tool => tool.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      {/* Ad Banner - Below Hero */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="horizontal" />
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Financial Tools
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful calculators to help you make informed financial decisions.
              All calculations happen in your browser.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tool.id
                    ? 'bg-accent text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 shadow'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>

          {/* Active Tool Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {ActiveToolComponent && <ActiveToolComponent />}
          </motion.div>

          {/* Interstitial Ad Banner */}
          <div className="mt-12">
            <AdBanner position="horizontal" />
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <InstagramSection />

      {/* About Section */}
      <About />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
