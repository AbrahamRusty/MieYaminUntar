import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/custom.css';
import '../../styles/Admin.module.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Impor komponen layout Anda
import { AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] }); // Next.js default, bisa dihapus jika hanya pakai Poppins

export const metadata: Metadata = {
  title: 'Admin - Mie Yamin Untar',
  description: 'Admin panel untuk Mie Yamin Untar',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AnimatePresence mode="wait">
        <main>{children}</main>
      </AnimatePresence>
    </div>
  );
}
