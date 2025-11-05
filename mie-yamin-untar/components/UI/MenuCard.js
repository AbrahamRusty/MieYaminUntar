'use client';

import { Card, Button } from 'react-bootstrap';
import Image from 'next/image';

export default function MenuItemCard({ title, description, price, imageUrl }) {
  return (
    <Card className="shadow-sm border-0 h-100">
          <Image
            src="/next.svg" // Placeholder image
            alt={title}
            width={300}
            height={250}
            className="card-img-top"
            style={{ objectFit: 'cover' }}
          />
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="fw-bold h5">{title}</Card.Title>
        <Card.Text className="text-muted small">{description}</Card.Text>
        
        {/* Bagian bawah kartu (Harga & Tombol) */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
          <span className="text-brand-primary fw-bold fs-5">
            {price}
          </span>
          <Button variant="" className="btn-brand-primary px-4">
            Order
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}