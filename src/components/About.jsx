import { motion } from 'framer-motion';
import { Lock, Zap, Calculator, Shield } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'All data stays in your browser. Nothing sent to servers.'
    },
    {
      icon: Zap,
      title: 'Zero Friction',
      description: 'No sign-up, no login. Start calculating immediately.'
    },
    {
      icon: Calculator,
      title: 'Accurate Tools',
      description: 'Precise financial calculations you can trust.'
    },
    {
      icon: Shield,
      title: 'Always Free',
      description: 'Complete access to all tools, forever free.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Your Financial Data. Your Control.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We built DebugYourFinance with privacy at its core. Every calculation happens
            in your browser—no servers, no tracking, no compromises.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
