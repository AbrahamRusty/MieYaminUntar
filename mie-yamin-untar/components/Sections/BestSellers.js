import SectionTag from '../UI/SectionTag';
import MenuCard from '../UI/MenuCard';

const BestSellers = () => {
  const bestSellers = [
    {
      name: "Mie Yamin Complete",
      price: "Rp25.000",
      description: "Favorit utama dengan keseimbangan sempurna antara manis, gurih, dan pedas.",
      image: "https://placehold.co/400x300/EAD9C8/333333?text=Mie+Yamin+Complete",
      isPopular: true
    },
    {
      name: "Mie Yamin Level 5",
      price: "Rp20.000",
      description: "Bagi mereka yang berani mencoba pedas ekstrem!",
      image: "https://placehold.co/400x300/EAD9C8/333333?text=Mie+Yamin+Level+5",
      isPopular: false
    },
    {
      name: "Pangsit Goreng",
      price: "Rp15.000",
      description: "Pangsit goreng yang renyah saat di gigitan",
      image: "https://placehold.co/400x300/EAD9C8/333333?text=Pangsit+Goreng",
      isPopular: false
    }
  ];

  return (
    <section id="best-sellers" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <SectionTag variant="blue">
            <i className="fas fa-trophy me-1"></i> Best Sellers
          </SectionTag>
          <h2 className="display-5 fw-bold mb-3">Hidangan Andalan Kami</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Hidangan-hidangan ini membuat pelanggan kami terus kembali untuk menikmatinya lagi
          </p>
        </div>
        
        <div className="row g-4">
          {bestSellers.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <MenuCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;