const Header = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-sm z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-orange-500">
          Mie Yamin Untar
        </a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-gray-600 hover:text-orange-500 transition-colors">Home</a>
          <a href="#about" className="text-gray-600 hover:text-orange-500 transition-colors">About</a>
          <a href="#menu" className="text-gray-600 hover:text-orange-500 transition-colors">Menu</a>
          <a href="#contact" className="text-gray-600 hover:text-orange-500 transition-colors">Contact</a>
          <a href="#" className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-all">
            Join Loyalty
          </a>
        </div>
        {/* Mobile Menu Button (opsional, bisa ditambahkan) */}
        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none">
            <i className="fas fa-bars fa-lg"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
