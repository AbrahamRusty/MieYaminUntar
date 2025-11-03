import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky-top bg-white shadow-sm" style={{ backdropFilter: 'blur(10px)' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold fs-2 text-warning">
            Mie Yamin Untar
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link href="#home" className="nav-link text-dark fw-medium">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="#about" className="nav-link text-dark fw-medium">About</Link>
              </li>
              <li className="nav-item">
                <Link href="#menu" className="nav-link text-dark fw-medium">Menu</Link>
              </li>
              <li className="nav-item">
                <Link href="#contact" className="nav-link text-dark fw-medium">Contact</Link>
              </li>
              <li className="nav-item ms-3">
                <Link href="#loyalty" className="btn btn-warning text-white fw-medium px-4 py-2 rounded-pill shadow">
                  Join Loyalty
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;