import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/layout/Hero';
import AdBanner from '../components/features/AdBanner';
import About from '../components/layout/About';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>DebugYourFinance - Master Your Money. Zero Friction.</title>
        <meta name="description" content="Privacy-first financial tools for the modern investor. SIP Calculator, Tax Regime Simulator, Loan Tenure Reducer - all without login." />
        <link rel="canonical" href="https://debugyourfinance.com/" />
        <meta property="og:url" content="https://debugyourfinance.com/" />
        <meta property="og:title" content="DebugYourFinance - Master Your Money. Zero Friction." />
        <meta property="og:description" content="Privacy-first financial tools for the modern investor. SIP Calculator, Tax Regime Simulator, Loan Tenure Reducer - all without login." />
        <meta property="twitter:url" content="https://debugyourfinance.com/" />
        <meta property="twitter:title" content="DebugYourFinance - Master Your Money. Zero Friction." />
        <meta property="twitter:description" content="Privacy-first financial tools for the modern investor. SIP Calculator, Tax Regime Simulator, Loan Tenure Reducer - all without login." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Hero />
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdBanner />
          </div>
        </section>
        <About />
      </motion.div>
    </>
  );
}
