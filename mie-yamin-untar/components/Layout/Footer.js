const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Kolom 1: About */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">Mie Yamin Untar</h4>
            <p className="text-gray-400 mb-6">
              Campus taste, endless flavor. Serving authentic noodles with love since 2018.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/mieyaminuntar" target="_blank" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">About</a></li>
              <li><a href="#menu" className="hover:text-orange-400 transition-colors">Menu</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">Loyalty Program</a></li>
            </ul>
          </div>

          {/* Kolom 3: Contact */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-orange-400 mt-1 mr-3 flex-shrink-0"></i>
                <span>Jl. Letjen S. Parman No. 1, Jakarta Barat</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-orange-400 mt-1 mr-3 flex-shrink-0"></i>
                <span>0812-3456-7890</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-orange-400 mt-1 mr-3 flex-shrink-0"></i>
                <span>info@mieyaminuntar.com</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Opening Hours */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Opening Hours</h5>
            <table className="w-full text-left">
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Monday - Friday</td>
                  <td className="py-2 font-medium text-white">09:00 - 21:00</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Saturday</td>
                  <td className="py-2 font-medium text-white">09:00 - 21:00</td>
                </tr>
                <tr>
                  <td className="py-2">Sunday</td>
                  <td className="py-2 font-medium text-gray-500">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Garis Pemisah */}
        <hr className="border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8">
          <p>&copy; 2025 Mie Yamin Untar. All rights reserved. Made with <i className="fas fa-heart text-red-500"></i> for students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
