import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../styles/custom.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Impor komponen layout Anda
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import FloatingWhatsApp from '@/components/Layout/FloatingChat';

const inter = Inter({ subsets: ['latin'] }); // Next.js default, bisa dihapus jika hanya pakai Poppins

export const metadata: Metadata = {
  title: 'Mie Yamin Untar - Campus Taste, Endless Flavor',
  description: 'Mie Yamin paling enak se-Untar!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Header />
        <main>{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
