'use client';

import SectionTag from '../UI/SectionTag';

const Contact = () => {
  const contactInfo = [
    {
      icon: 'map-marker-alt',
      title: 'Address',
      content: 'Jl. Letjen S. Parman No. 1, Kampus Untar, Jakarta Barat',
      bgColor: 'contact-orange',
      type: 'address'
    },
    {
      icon: 'clock',
      title: 'Open Hours',
      content: 'Monday – Saturday: 09.00 – 21.00 WIB',
      bgColor: 'contact-orange',
      type: 'hours'
    },
    {
      icon: 'phone-alt',
      title: 'Contact',
      content: 'WhatsApp: 0812-3456-7890',
      bgColor: 'contact-green',
      type: 'contact',
      button: {
        text: 'Order via WhatsApp',
        link: 'https://wa.me/6281234567890',
        class: 'btn-light text-success'
      }
    },
    {
      icon: 'instagram',
      title: 'Social Media',
      content: '@mieyaminuntar',
      bgColor: 'contact-purple',
      type: 'social',
      link: 'https://www.instagram.com/mieyaminuntar'
    }
  ];

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      'Halo Mie Yamin Untar! Saya ingin memesan:\n\n' +
      '• Mie Yamin Complete - Rp25.000\n' +
      '• Mie Yamin Level 5 - Rp20.000\n' +
      '• Pangsit Goreng - Rp15.000\n\n' +
      'Total: Rp60.000\n\n' +
      'Bisa dikirim ke alamat: [Alamat Pengiriman]\n' +
      'Terima kasih!'
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const handleQuickOrder = (menuItem) => {
    const message = encodeURIComponent(
      `Halo Mie Yamin Untar! Saya ingin memesan:\n\n` +
      `• ${menuItem.name} - ${menuItem.price}\n\n` +
      `Apakah masih tersedia?`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  const popularOrders = [
    { name: 'Mie Yamin Complete', price: 'Rp25.000' },
    { name: 'Mie Yamin Level 5', price: 'Rp20.000' },
    { name: 'Pangsit Goreng (5 pcs)', price: 'Rp10.000' },
    { name: 'Paket Komplit 2 Orang', price: 'Rp45.000' }
  ];

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <SectionTag variant="pink">
            <i className="fas fa-store me-2"></i> Visit Us
          </SectionTag>
          <h2 className="display-5 fw-bold mb-3">Find Us Here</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Visit our convenient campus location or order online for delivery
          </p>
        </div>

        <div className="row g-5">
          {/* Contact Information & Quick Order */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              {/* Contact Cards */}
              {contactInfo.map((item, index) => (
                <div key={index} className={`contact-card ${item.bgColor} ${item.type === 'contact' || item.type === 'social' ? 'text-white' : ''}`}>
                  <div className="d-flex align-items-start gap-4">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${item.type === 'contact' || item.type === 'social' ? 'bg-white bg-opacity-30' : 'contact-orange'}`} 
                         style={{ width: '48px', height: '48px' }}>
                      <i className={`fas fa-${item.icon} fa-lg ${item.type === 'contact' || item.type === 'social' ? '' : 'text-warning'}`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-semibold mb-2">{item.title}</h5>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={`text-decoration-none ${item.type === 'social' ? 'text-white opacity-75' : 'text-muted'}`}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className={`mb-0 ${item.type === 'contact' || item.type === 'social' ? 'opacity-75' : 'text-muted'}`}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Button for contact card */}
                  {item.button && (
                    <div className="mt-3">
                      <a 
                        href={item.button.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`btn ${item.button.class} fw-bold w-100`}
                        onClick={handleWhatsAppOrder}
                      >
                        {item.button.text}
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Order Section */}
              <div className="contact-card bg-white mt-3">
                <h5 className="fw-semibold mb-3 text-center">
                  <i className="fas fa-bolt text-warning me-2"></i>
                  Quick Order
                </h5>
                <div className="d-grid gap-2">
                  {popularOrders.map((item, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-warning d-flex justify-content-between align-items-center"
                      onClick={() => handleQuickOrder(item)}
                    >
                      <span className="text-start">
                        <small className="d-block fw-bold">{item.name}</small>
                        <small className="text-muted">{item.price}</small>
                      </span>
                      <i className="fas fa-cart-plus"></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-lg-8">
            <div className="rounded-4 shadow overflow-hidden">
              <div className="bg-white p-3 border-bottom">
                <h6 className="mb-0">
                  <i className="fas fa-map-pin text-danger me-2"></i>
                  Lokasi Kami di Google Maps
                </h6>
              </div>
              <div style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666300188849!2d106.7909289153329!3d-6.17539239552917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6f1f4f46f4b%3A0x2e3b2e3b2e3b2e3b!2sUniversitas%20Tarumanagara%20(UNTAR)%20-%20Kampus%20I!5e0!3m2!1sen!2sid!4v1678888888888"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Mie Yamin Untar"
                ></iframe>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="row mt-4 g-3">
              <div className="col-md-6">
                <div className="contact-card bg-white h-100">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-orange rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" 
                         style={{ width: '48px', height: '48px' }}>
                      <i className="fas fa-motorcycle fa-lg"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Delivery Service</h6>
                      <p className="text-muted small mb-0">
                        Area sekitar kampus Untar<br/>
                        Min. order Rp25.000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact-card bg-white h-100">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-orange rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" 
                         style={{ width: '48px', height: '48px' }}>
                      <i className="fas fa-credit-card fa-lg"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">Payment Methods</h6>
                      <p className="text-muted small mb-0">
                        Cash • Transfer Bank •<br/>
                        E-wallet • QRIS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="contact-card contact-green text-center mt-4">
              <h5 className="fw-semibold mb-3">
                <i className="fas fa-headset me-2"></i>
                Butuh Bantuan?
              </h5>
              <p className="opacity-75 mb-3">
                Tim customer service kami siap membantu Anda dari jam 09.00 - 21.00 WIB
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <a 
                  href="tel:081234567890" 
                  className="btn btn-light text-success fw-bold"
                >
                  <i className="fas fa-phone me-2"></i>
                  Call Now
                </a>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline-light fw-bold"
                >
                  <i className="fab fa-whatsapp me-2"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Methods */}
        <div className="row mt-5 pt-4 border-top">
          <div className="col-md-4 text-center">
            <div className="contact-card bg-white h-100">
              <div className="contact-orange rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                   style={{ width: '64px', height: '64px' }}>
                <i className="fas fa-envelope fa-2x"></i>
              </div>
              <h6 className="fw-semibold">Email Support</h6>
              <p className="text-muted small mb-2">Kirim pertanyaan via email</p>
              <a href="mailto:info@mieyaminuntar.com" className="btn btn-outline-warning btn-sm">
                info@mieyaminuntar.com
              </a>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="contact-card bg-white h-100">
              <div className="contact-orange rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                   style={{ width: '64px', height: '64px' }}>
                <i className="fas fa-calendar-alt fa-2x"></i>
              </div>
              <h6 className="fw-semibold">Catering Service</h6>
              <p className="text-muted small mb-2">Untuk acara & meeting</p>
              <button className="btn btn-outline-warning btn-sm">
                Pesan Catering
              </button>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="contact-card bg-white h-100">
              <div className="contact-orange rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                   style={{ width: '64px', height: '64px' }}>
                <i className="fas fa-users fa-2x"></i>
              </div>
              <h6 className="fw-semibold">Group Orders</h6>
              <p className="text-muted small mb-2">Diskon untuk order besar</p>
              <button className="btn btn-outline-warning btn-sm">
                Info Group Order
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="alert alert-warning mt-4 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            <strong>Perhatian:</strong>
            <span className="ms-2">
              Pada hari Minggu dan tanggal merah kami tutup. Terima kasih atas pengertiannya.
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .min-vh-50 {
          min-height: 400px;
        }
        
        @media (max-width: 768px) {
          .min-vh-50 {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;