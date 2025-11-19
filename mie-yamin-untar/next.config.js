/** @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi ini memberi tahu Next.js untuk mengarahkan semua permintaan yang dimulai dengan '/api/'
  // dari port 3000 ke http://localhost:5000 (server Express Anda).
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:5000/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;