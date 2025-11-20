'use client';

import AllMenu from '@/components/Sections/AllMenu';
import { motion } from 'framer-motion';

export default function AllMenuPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <AllMenu />
    </motion.div>
  );
}
