import SectionTag from '../UI/SectionTag';

const FullMenu = () => {
  const menuItems = [
    {
      name: "Mie Yamin Original",
      description: "Mie klasik dengan ayam kecap manis",
      price: "Rp18.000",
      image: "https://placehold.co/100x100/EAD9C8/333333?text=Mie+Original"
    },
    {
      name: "Mie Yamin Level 5",
      description: "Pedas dan penuh rasa bagi para pecinta rempah",
      price: "Rp20.000",
      image: "https://placehold.co/100x100/EAD9C8/333333?text=Mie+Level+5"
    },
    {
      name: "Mie Yamin Complete",
      description: "Includes chicken, dumplings, meatballs, and sambal",
      price: "Rp25.000",
      image: "https://placehold.co/100x100/EAD9C8/333333?text=Mie+Complete"
    },
    {
      name: "Pangsit Goreng (5 pcs)",
      description: "Renyah dan gurih",
      price: "Rp10.000",
      image: "https://placehold.co/100x100/EAD9C8/333333?text=Pangsit+Goreng"
    },
    {
      name: "Es Teh",
      description: "teman minum yang sempurna",
      price: "Rp5.000",
      image: "https://placehold.co/100x100/EAD9C8/333333?text=Es+Teh"
    }
  ];

  return (
    <section id="menu" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <SectionTag variant="pink">Full Menu</SectionTag>
          <h2 className="display-5 fw-bold mb-3">Pilihan Menu Lengkap</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Mie segar, topping melimpah, dan harga ramah di kantong
          </p>
        </div>
        
        <div className="row g-4">
          {menuItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="rounded-3 flex-shrink-0"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold mb-1">{item.name}</h5>
                      <p className="card-text text-muted small mb-2">{item.description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-warning">{item.price}</span>
                        <a href="#" className="btn btn-success btn-sm">
                          Order
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullMenu;