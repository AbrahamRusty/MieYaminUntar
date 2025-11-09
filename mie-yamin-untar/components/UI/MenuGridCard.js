// components/UI/MenuGridCard.js
'use client';

import { Card, Button } from 'react-bootstrap';
import Image from 'next/image';

export default function MenuGridCard({ title, description, price, imageUrl }) {
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
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand-secondary"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Order
        </a>
      </Card.Body>
    </Card>
  );
}