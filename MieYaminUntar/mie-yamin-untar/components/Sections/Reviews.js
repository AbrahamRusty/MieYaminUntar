'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
// Impor ikon Bintang dan Kutipan
import { BsStarFill } from 'react-icons/bs';
import { FaQuoteLeft } from 'react-icons/fa';

// Data review (bisa diganti dari API)
const reviewsData = [
  {
    name: 'Sarah Wijaya',
    title: 'Mahasiswa Untar',
    review:
      'Mie yamin terenak di sekitar kampus! Porsinya banyak, harganya ramah kantong mahasiswa. Pantesan selalu rame, rasanya emang juara!',
  },
  {
    name: 'Budi Santoso',
    title: 'Alumni Untar',
    review:
      'Udah langganan dari jaman kuliah sampe sekarang kerja masih sering balik kesini. Rasanya konsisten, pelayanannya cepat, dan tempatnya nyaman.',
  },
  {
    name: 'Dina Rahma',
    title: 'Food Blogger',
    review:
      'Level pedasnya beneran nggak main-main! Cocok buat yang suka tantangan. Tapi yang original juga enak kok, bumbu kecapnya pas banget.',
  },
];

// Komponen helper untuk Bintang
const StarRating = ({ count = 5 }) => (
  <div className="rating-stars">
    {Array.from({ length: count }).map((_, i) => (
      <BsStarFill key={i} className="me-1" />
    ))}
  </div>
);

export default function Reviews() {
  return (
    <Container as="section" className="py-5 my-4" id="review">
      {/* 1. HEADER (Tag, Judul, Subjudul) */}
      <Row className="justify-content-center text-center mb-5">
        <Col xs="auto">
          {/* Badge "Customer Reviews" */}
          <div className="review-badge">
            <BsStarFill style={{ color: '#FFB400' }} />
            <span>Customer Reviews</span>
          </div>
        </Col>
        <Col xs={12}>
          <h2 className="section-title mt-3">Review Pelanggan kami</h2>
        </Col>
        <Col lg={7}>
          <p className="text-muted fs-5">
            Real reviews from our beloved customers
          </p>
        </Col>
      </Row>

      {/* 2. GRID KARTU REVIEW */}
      <Row className="gy-4">
        {reviewsData.map((review, index) => (
          <Col lg={4} md={6} key={index}>
            <Card className="review-card">
              <FaQuoteLeft className="review-quote-icon" />
              <Card.Body>
                <StarRating />
                <p className="review-text">{review.review}</p>
                <div>
                  <h6 className="review-author mb-0">{review.name}</h6>
                  <span className="review-author-title">{review.title}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 3. RATING RATA-RATA DI BAWAH */}
      <Row className="mt-5">
        <Col className="text-center">
          <div className="average-rating">
            <div className="rating-stars">
              <BsStarFill className="me-1" />
              <BsStarFill className="me-1" />
              <BsStarFill className="me-1" />
              <BsStarFill className="me-1" />
              <BsStarFill className="me-1" />
            </div>
            <span>4.8 average rating from 1,200+ reviews</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}