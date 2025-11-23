'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline();

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        },
        "-=0.2"
      )
      // Floating icons animation
      const icons = imageRef.current.querySelectorAll('.floating-icon');
      gsap.set(icons, { opacity: 0, scale: 0, rotation: -180 });

      gsap.to(icons, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        delay: 0.5
      });

      // Continuous floating animation
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          y: -20,
          rotation: 10,
          duration: 2 + index * 0.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        });
      });

      // Button hover animations
      const buttons = buttonsRef.current.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Container as="section" ref={heroRef} className="py-5 my-md-5" id="home">
      <Row className="align-items-center gy-5">
        {/* Kolom Kiri: Teks, CTA, & Statistik */}
        <Col lg={6}>
          {/* Badge (tetap sama) */}
          <div ref={badgeRef} className="hero-badge mb-3">
            <BsStar />
            <span>Favorit Kampus Sejak 2018</span>
          </div>

          {/* 1. Headline - KEDUA baris dibuat Oranye */}
          <h1 ref={headlineRef} className="display-3 fw-bolder lh-1 mb-3">
            <span className="text-brand-primary">Campus Taste,</span>
            <br />
            <span className="text-brand-primary">Endless Flavor</span>
          </h1>

          {/* Paragraf (tetap sama) */}
          <p ref={paragraphRef} className="lead text-muted mb-4 pb-2">
            Mie autentik yang dibuat dengan bahan-bahan segar pilihan, topping melimpah,
            dan resep rahasia yang selalu berhasil memuaskan. Setiap gigitan
            membawa kenangan kuliner kampus yang tak terlupakan.
          </p>

          {/* Tombol CTA (tetap sama) */}
          <div ref={buttonsRef} className="mb-5">
            <Link href="/pricing" passHref>
              <Button
                variant=""
                className="btn-brand-primary btn-lg me-3 px-4"
              >
                Gabung Program Loyalitas
              </Button>
            </Link>
            <Link href="/all-menu" passHref>
              <Button
                variant=""
                className="btn-brand-secondary btn-lg px-4"
              >
                Pesan Sekarang
              </Button>
            </Link>
          </div>

          {/* 2. Statistik - Diubah sesuai permintaan Anda */}
          <Row ref={statsRef}>
            <Col xs={4} className="hero-stats-item">
              <h4>100+</h4> {/* <--- DIUBAH */}
              <p>Mahasiswa Puas</p>
            </Col>
            <Col xs={4} className="hero-stats-item">
              <h4 className="d-flex align-items-center">
                4.8
                <BsStarFill className="star-icon" />
              </h4>
              <p>Rating Pelanggan</p>
            </Col>
            <Col xs={4} className="hero-stats-item">
              <h4>50+</h4> {/* <--- DIUBAH */}
              <p>Tahun Melayani</p> {/* (Teksnya saya biarkan 'Years Serving') */}
            </Col>
          </Row>
        </Col>

        {/* Kolom Kanan: Gambar dengan Floating Icons */}
        <Col lg={6}>
          <div ref={imageRef} className="image-container">
            <Image
              src="/mie-yamin-hero-baru.png" // Ganti dengan path gambar mie Anda
              alt="Mie Yamin Lezat"
              width={600}
              height={600}
              className="img-fluid rounded-4 shadow-lg"
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              priority
            />
            {/* Floating Icons around the image */}
            <div className="floating-icon icon-1">🍜</div>
            <div className="floating-icon icon-2">🥢</div>
            <div className="floating-icon icon-3">🍥</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
