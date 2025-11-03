import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* About Column */}
          <div className="col-md-3">
            <h4 className="fw-bold text-white mb-3">Mie Yamin Untar</h4>
            <p className="text-light mb-4">
              Campus taste, endless flavor. Serving authentic noodles with love since 2018.
            </p>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com/mieyaminuntar" className="social-icon text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon text-white">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="col-md-3">
            <h5 className="fw-semibold text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="#home" className="text-light text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link href="#about" className="text-light text-decoration-none">About</Link></li>
              <li className="mb-2"><Link href="#menu" className="text-light text-decoration-none">Menu</Link></li>
              <li><Link href="#loyalty" className="text-light text-decoration-none">Loyalty Program</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-md-3">
            <h5 className="fw-semibold text-white mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <i className="fas fa-map-marker-alt text-warning mt-1 me-3"></i>
                <span>Jl. Letjen S. Parman No. 1, Jakarta Barat</span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <i className="fas fa-phone-alt text-warning mt-1 me-3"></i>
                <span>0812-3456-7890</span>
              </li>
              <li className="d-flex align-items-start">
                <i className="fas fa-envelope text-warning mt-1 me-3"></i>
                <span>info@mieyaminuntar.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div className="col-md-3">
            <h5 className="fw-semibold text-white mb-3">Opening Hours</h5>
            <table className="w-100">
              <tbody>
                <tr className="border-bottom border-secondary">
                  <td className="py-2">Monday - Friday</td>
                  <td className="py-2 fw-medium text-white">09:00 - 21:00</td>
                </tr>
                <tr className="border-bottom border-secondary">
                  <td className="py-2">Saturday</td>
                  <td className="py-2 fw-medium text-white">09:00 - 21:00</td>
                </tr>
                <tr>
                  <td className="py-2">Sunday</td>
                  <td className="py-2 text-muted">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <hr className="border-secondary" />
        
        <div className="text-center py-3 text-muted">
          <p className="mb-0">
            &copy; 2025 Mie Yamin Untar. All rights reserved. Made with <i className="fas fa-heart text-danger"></i> for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;