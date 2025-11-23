import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../styles/custom.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Impor komponen layout Anda
import Header from '@/components/Layout/Header';
import FooterWrapper from '@/components/Layout/FooterWrapper';
import { Web3ModalProvider } from '@/components/Web3Providers';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] }); // Next.js default, bisa dihapus jika hanya pakai Poppins

export const metadata: Metadata = {
  title: 'Mie Yamin Loyalty - Program Loyalitas dengan Web3',
  description: 'Program loyalitas Mie Yamin dengan Web3 dan NFT membership',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Web3ModalProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
            <div style={{ paddingTop: '80px' }}>
              <AnimatePresence mode="wait">
                <main>{children}</main>
              </AnimatePresence>
            </div>
            <FooterWrapper />
            </CartProvider>
          </AuthProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
