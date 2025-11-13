'use client';

import { BsCart3 } from 'react-icons/bs';
import { useCart } from '@/contexts/CartContext';

export default function FloatingCart() {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  const style = {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    backgroundColor: '#ff6b35',
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    cursor: 'pointer',
    border: 'none'
  };

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      style={style}
      className="floating-cart-btn"
    >
      <BsCart3 />
      {totalItems > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
