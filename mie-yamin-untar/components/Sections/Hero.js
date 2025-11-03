import SectionTag from '../UI/SectionTag';

const Hero = () => {
  return (
    <section id="home" className="hero-gradient py-5">
      <div className="container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <SectionTag variant="orange">
              <i className="fas fa-star me-1"></i> Campus Favorite Since 2018
            </SectionTag>
            
            <h1 className="display-3 fw-bold mb-4">
              Campus Taste,
              <span className="text-warning"> Endless Flavor</span>
            </h1>
            
            <p className="lead text-muted mb-5">
              Mie autentik yang dibuat dengan bahan segar, topping yang melimpah, dan resep yang selalu berhasil. Setiap gigitan mengembalikan kenangan.
            </p>
            
            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <a href="#loyalty" className="btn-custom btn-orange">
                Join Loyalty Program
              </a>
              <a href="#menu" className="btn-custom btn-green">
                Order Now
              </a>
            </div>
            
            {/* Statistics */}
            <div className="d-flex gap-5">
              <div>
                <p className="h1 fw-bold text-warning mb-1">10k+</p>
                <p className="text-muted">Happy Students</p>
              </div>
              <div>
                <p className="h1 fw-bold text-warning mb-1 d-flex align-items-center">
                  4.8 <i className="fas fa-star text-warning ms-2 fs-4"></i>
                </p>
                <p className="text-muted">Customer Rating</p>
              </div>
              <div>
                <p className="h1 fw-bold text-warning mb-1">5+</p>
                <p className="text-muted">Years Serving</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 text-center">
            <img 
              src="https://placehold.co/600x450/FDEBD0/333333?text=Mie+Yamin+Lezat" 
              alt="Mie Yamin Lezat" 
              className="img-fluid rounded-4 shadow"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;