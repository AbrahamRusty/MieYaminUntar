import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mie Yamin Untar - Campus Favorite Since 2018",
  description: "Mie autentik yang dibuat dengan bahan segar, topping yang melimpah, dan resep yang selalu berhasil. Setiap gigitan mengembalikan kenangan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
