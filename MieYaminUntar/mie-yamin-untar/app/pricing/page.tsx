'use client';

import Pricing from '@/components/Sections/Pricing';
import Loyalty from '@/components/Sections/loyalty';
import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Pricing />
      <Loyalty />
    </motion.div>
  );
}
