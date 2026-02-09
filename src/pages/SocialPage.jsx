import { motion } from 'framer-motion';
import InstagramSection from '../components/InstagramSection';

export default function SocialPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <InstagramSection />
    </motion.div>
  );
}
