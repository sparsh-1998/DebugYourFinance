import { motion } from 'framer-motion';
import Hero from '../components/layout/Hero';
import AdBanner from '../components/features/AdBanner';
import About from '../components/layout/About';

export default function HomePage() {
  return (
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
  );
}
