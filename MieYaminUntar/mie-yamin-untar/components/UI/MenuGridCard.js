// components/UI/MenuGridCard.js
'use client';

import { Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function MenuGridCard({ title, description, price, imageUrl }) {
  const { addToCart } = useCart();

  return (
    <Card className="menu-grid-card">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={250}
        className="card-img-top"
        style={{ objectFit: 'cover', borderRadius: '1rem 1rem 0 0' }}
      />
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="fw-bold h5">{title}</Card.Title>
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          {description}
        </Card.Text>

        {/* Harga (Oranye) */}
        <div className="card-price">
          {price}
        </div>

        {/* Tombol Order (Hijau) */}
        <Button
          variant=""
          className="btn-brand-secondary"
          onClick={() => addToCart({ title, description, price, imageUrl })}
        >
          Pesan
        </Button>
      </Card.Body>
    </Card>
  );
}
