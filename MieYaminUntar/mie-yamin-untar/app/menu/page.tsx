'use client';

import MenuMie from '@/components/Sections/MenuMie';
import { motion } from 'framer-motion';

export default function MenuPage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <MenuMie />
    </motion.div>
  );
}