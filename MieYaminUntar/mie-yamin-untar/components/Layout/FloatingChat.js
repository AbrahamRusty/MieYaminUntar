'use client';
import { BsWhatsapp } from 'react-icons/bs'; // Ganti ikonnya

export default function FloatingWhatsApp() {
  const whatsappUrl = 'https://wa.me/6281234567890'; // Ganti dengan nomor Anda

  const style = {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    backgroundColor: '#25D366', // Warna Hijau WhatsApp
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px', // Ikon WhatsApp sedikit lebih besar
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    cursor: 'pointer',
  };

  return (
    // @ts-ignore
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={style}>
      <BsWhatsapp />
    </a>
  );
}