'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { BsBullseye, BsCheck2Circle, BsFillStopFill } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Image fade in
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Text animations
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animations
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animations
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Card hover animations
      const cards = cardsRef.current.querySelectorAll('.vision-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container as="section" ref={sectionRef} className="py-5 my-4" id="about">
      {/* 1. HEADER (Tag, Judul, Subjudul) */}
      <Row className="justify-content-center text-center mb-5">
        <Col xs="auto">
          {/* Badge kustom 'Our Story' */}
          <div ref={badgeRef} className="soft-badge">Our Story</div>
        </Col>
        <Col xs={12}>
          <h2 ref={titleRef} className="section-title mt-3">About Mie Yamin Untar</h2>
        </Col>
        <Col lg={7}>
          <p ref={subtitleRef} className="text-muted fs-5">
            Dari gerobak makanan sederhana menjadi merek kampus yang dicintai
          </p>
        </Col>
      </Row>

      {/* 2. KONTEN UTAMA (Gambar + Teks + Statistik) */}
      <Row className="align-items-center gy-4">
        {/* Kolom Gambar */}
        <Col lg={6}>
          <Image
            ref={imageRef}
            src="/about.jpg" // Ganti dengan path gambar Anda di /public
            alt="Gerobak Mie Yamin Untar"
            width={500}
            height={600}
            className="img-fluid rounded-4 shadow"
            style={{ objectFit: 'cover', width: '100%', maxHeight: '550px' }}
          />
        </Col>

        {/* Kolom Teks + Statistik */}
        <Col lg={6}>
          <div ref={textRef}>
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
          </div>

          {/* Baris Statistik */}
          <Row ref={statsRef} className="mt-4 pt-2 text-center">
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
      <Row ref={cardsRef} className="mt-5 pt-4 gy-4">
        {/* Kartu Visi */}
        <Col lg={6}>
          <div
            className="vision-card rounded-4 p-4 p-lg-5 h-100"
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
          <div className="vision-card bg-white shadow-sm rounded-4 p-4 p-lg-5 h-100 border">
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
