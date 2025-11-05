'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { BsBullseye, BsCheck2Circle, BsFillStopFill } from 'react-icons/bs';

export default function VisionMission() {
  return (
    <Container as="section" className="py-5 my-4" id="about">
      {/* 1. HEADER (Tag, Judul, Subjudul) */}
      <Row className="justify-content-center text-center mb-5">
        <Col xs="auto">
          {/* Badge kustom 'Our Story' */}
          <div className="soft-badge">Our Story</div>
        </Col>
        <Col xs={12}>
          <h2 className="section-title mt-3">About Mie Yamin Untar</h2>
        </Col>
        <Col lg={7}>
          <p className="text-muted fs-5">
            Dari gerobak makanan sederhana menjadi merek kampus yang dicintai
          </p>
        </Col>
      </Row>

      {/* 2. KONTEN UTAMA (Gambar + Teks + Statistik) */}
      <Row className="align-items-center gy-4">
        {/* Kolom Gambar */}
        <Col lg={6}>
          <Image
            src="/gerobak.jpg" // Ganti dengan path gambar Anda di /public
            alt="Gerobak Mie Yamin Untar"
            width={500}
            height={600}
            className="img-fluid rounded-4 shadow"
            style={{ objectFit: 'cover', width: '100%', maxHeight: '550px' }}
          />
        </Col>

        {/* Kolom Teks + Statistik */}
        <Col lg={6}>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Sejak dibuka dekat Universitas Tarumanagara, Mie Yamin Untar telah
            menjadi favorit bagi mahasiswa dan warga lokal yang mencari rasa
            hangat dan menghibur.
          </p>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Bermula dari gerobak makanan kecil, kami telah berkembang menjadi
            merek modern yang menggabungkan resep tradisional dan kemudahan
            digital. Komitmen kami terhadap kualitas dan rasa tetap tidak
            berubah.
          </p>

          {/* Baris Statistik */}
          <Row className="mt-4 pt-2 text-center">
            <Col xs={4}>
              <h1 className="fw-bold text-brand-primary mb-0">5+</h1>
              <span className="text-muted">Tahun</span>
            </Col>
            <Col xs={4}>
              <h1 className="fw-bold text-brand-primary mb-0">50+</h1>
              <span className="text-muted">Order Per Hari</span>
            </Col>
            <Col xs={4}>
              <h1 className="fw-bold text-brand-primary mb-0">100%</h1>
              <span className="text-muted">Halal</span>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 3. KARTU VISI & MISI */}
      <Row className="mt-5 pt-4 gy-4">
        {/* Kartu Visi */}
        <Col lg={6}>
          <div
            className="rounded-4 p-4 p-lg-5 h-100"
            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          >
            <BsBullseye className="fs-1 mb-3" />
            <h3 className="fw-bold">VISI</h3>
            <p className="fs-5">
              Menjadi merek mi kampus teratas yang menggabungkan cita rasa dan
              teknologi.
            </p>
          </div>
        </Col>

        {/* Kartu Misi */}
        <Col lg={6}>
          <div className="bg-white shadow-sm rounded-4 p-4 p-lg-5 h-100 border">
            <BsCheck2Circle
              className="fs-1 mb-3"
              style={{ color: 'var(--color-primary)' }}
            />
            <h3 className="fw-bold">MISI</h3>
            <ul className="misi-list mt-3 fs-5">
              <li>
                <BsFillStopFill className="misi-list-icon" />
                Menyajikan bahan halal berkualitas tinggi
              </li>
              <li>
                <BsFillStopFill className="misi-list-icon" />
                Menyajikan bahan halal berkualitas tinggi ...
              </li>
              <li>
                <BsFillStopFill className="misi-list-icon" />
                Bangun komunitas pelanggan yang setia dengan manfaat eksklusif
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}