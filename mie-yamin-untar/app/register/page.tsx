'use client';

import Register from '@/components/Sections/Register';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Register />
    </motion.div>
  );
}
