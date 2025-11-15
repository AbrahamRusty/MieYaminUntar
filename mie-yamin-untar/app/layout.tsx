import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../styles/custom.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Impor komponen layout Anda
import Header from '@/components/Layout/Header';
import FooterWrapper from '@/components/Layout/FooterWrapper';
import { CartProvider } from '@/contexts/CartContext';
import { AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] }); // Next.js default, bisa dihapus jika hanya pakai Poppins

export const metadata: Metadata = {
  title: 'Mie Yamin Untar - Website UMKM Mie Yamin',
  description: 'Website resmi Mie Yamin Untar - Program loyalitas dan pemesanan online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          <Header />
          <div style={{ paddingTop: '80px' }}>
            <AnimatePresence mode="wait">
              <main>{children}</main>
            </AnimatePresence>
          </div>
          <FooterWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
