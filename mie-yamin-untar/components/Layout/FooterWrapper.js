'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();

  // Don't render footer on admin pages
  if (pathname.startsWith('/Admin')) {
    return null;
  }

  return <Footer />;
}
