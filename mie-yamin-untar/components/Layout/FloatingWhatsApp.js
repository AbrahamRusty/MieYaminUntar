const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/6281234567890" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed-bottom end-0 m-4 bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow"
      style={{ width: '56px', height: '56px', zIndex: 1000 }}
    >
      <i className="fab fa-whatsapp fa-lg"></i>
    </a>
  );
};

export default FloatingWhatsApp;