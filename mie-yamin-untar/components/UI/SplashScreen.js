// components/UI/SplashScreen.js

import React from 'react';

// Menerima prop 'isFading' untuk memicu animasi fade-out
export default function SplashScreen({ isFading }) {
  return (
    <div id="splash-screen" className={isFading ? 'fading-out' : ''}>
      <div className="splash-content">

        {/* 1. Komponen SVG Mie & Sumpit (pengganti Image) */}
        <div className="splash-elements">
          <NoodlesIcon />
        </div>

        {/* 2. Komponen SVG Mangkok (pengganti Image) */}
        <div className="splash-bowl">
          <BowlIcon />
        </div>

        {/* 3. Teks "MIE YAMIN" (Disesuaikan untuk animasi karakter per karakter) */}
        <h1 className="splash-text">
          <span>M</span>
          <span>I</span>
          <span>E</span>
          <span style={{ marginLeft: '0.2em' }}>Y</span> {/* Spasi antara kata */}
          <span>A</span>
          <span>M</span>
          <span>I</span>
          <span>N</span>
        </h1>

      </div>
    </div>
  );
}

// --- Komponen SVG ---

// Ini adalah kode yang menggambar MANGKOK (Versi lebih pendek)
const BowlIcon = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="#333" // Warna mangkok
  >
    <path
      d="M 10,40
          C 10,55 30,70 50,70 
          C 70,70 90,55 90,40
          L 90,35
          C 90,30 85,30 85,30
          L 15,30
          C 15,30 10,30 10,35
          L 10,40 Z"
      stroke="#333"
      strokeWidth="2"
      fill="#FFFFFF" // Warna dalam mangkok
    />
    <path
      d="M 15,30
          L 10,30
          C 10,25 15,25 15,25
          L 85,25
          C 85,25 90,25 90,30
          L 85,30"
      stroke="#333"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 30,65 
          C 30,70 40,75 50,75 
          C 60,75 70,70 70,65"
      stroke="#333"
      strokeWidth="2"
      fill="#FFFFFF" // Warna alas mangkok
    />
  </svg>
);

// Ini adalah kode yang menggambar MIE & SUMPIT
const NoodlesIcon = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sumpit 1 */}
    <rect
      x="50"
      y="-10"
      width="8"
      height="80"
      rx="4"
      fill="#8D6E63" // Warna kayu sumpit
      transform="rotate(10 50 50)"
    />
    {/* Sumpit 2 */}
    <rect
      x="70"
      y="-10"
      width="8"
      height="80"
      rx="4"
      fill="#8D6E63"
      transform="rotate(20 50 50)"
    />
    {/* Mie */}
    <path
      d="M 20,50 C 30,30 40,60 50,40 S 60,70 70,50 S 80,30 90,60"
      stroke="#FFB74D" // Warna mie
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 15,60 C 25,40 35,70 45,50 S 55,80 65,60 S 75,40 85,70"
      stroke="#FFB74D"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);