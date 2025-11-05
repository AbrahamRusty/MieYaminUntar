'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Sections/Hero';
import VisionMission from '@/components/Sections/VisionMission'; // Ini section "About Us"
import FullMenu from '@/components/Sections/FullMenu';
import Reviews from '@/components/Sections/Reviews';
import Contact from '@/components/Sections/Contact';
import SplashScreen from '@/components/UI/SplashScreen';
import { motion } from 'framer-motion';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Setelah 1.5 detik (kuah + teks), mulai fade-out
    const timer = setTimeout(() => {
      setIsFading(true);
    }, 1500);

    // Setelah fade-out selesai (0.5 detik), sembunyikan splash screen
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {showSplash && <SplashScreen isFading={isFading} />}
      <Hero />
      <VisionMission />
      <FullMenu />
      <Reviews />
      <Contact />
    </motion.div>
  );
}
