import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import InstagramSection from '../components/features/InstagramSection';

export default function SocialPage() {
  return (
    <>
      <Helmet>
        <title>Follow @DebugYourFinance on Instagram | Financial Tips & Insights</title>
        <meta name="description" content="Follow DebugYourFinance on Instagram for daily financial tips, investment insights, and money management advice. Learn about SIP, taxes, loans, and more." />
        <link rel="canonical" href="https://debugyourfinance.com/social" />
        <meta property="og:url" content="https://debugyourfinance.com/social" />
        <meta property="og:title" content="Follow @DebugYourFinance on Instagram | Financial Tips & Insights" />
        <meta property="og:description" content="Follow DebugYourFinance on Instagram for daily financial tips, investment insights, and money management advice. Learn about SIP, taxes, loans, and more." />
        <meta property="twitter:url" content="https://debugyourfinance.com/social" />
        <meta property="twitter:title" content="Follow @DebugYourFinance on Instagram | Financial Tips & Insights" />
        <meta property="twitter:description" content="Follow DebugYourFinance on Instagram for daily financial tips, investment insights, and money management advice. Learn about SIP, taxes, loans, and more." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InstagramSection />
      </motion.div>
    </>
  );
}
