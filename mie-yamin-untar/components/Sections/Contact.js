const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-tag tag-pink">Visit Us</span>
          <h2 className="text-4xl font-bold mb-4">Find Us Here</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Visit our convenient campus location
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Kontak */}
          <div className="lg:col-span-1 space-y-6">
            {/* Alamat */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-start gap-5">
              <div className="bg-orange-100 text-orange-500 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-xl"></i>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Address</h4>
                <p className="text-gray-600">Jl. Letjen S. Parman No. 1, Kampus Untar, Jakarta Barat</p>
              </div>
            </div>
            {/* Jam Buka */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex items-start gap-5">
              <div className="bg-orange-100 text-orange-500 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Open Hours</h4>
                <p className="text-gray-600">Monday – Saturday: 09.00 – 21.00 WIB</p>
              </div>
            </div>
            {/* Kontak */}
            <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-white/30 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                  <i className="fas fa-phone-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Contact</h4>
                  <p className="text-green-100">WhatsApp: 0812-3456-7890</p>
                </div>
              </div>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="bg-white text-green-600 font-bold px-6 py-2 rounded-lg w-full text-center block hover:bg-gray-100 transition-all">
                Order via WhatsApp
              </a>
            </div>
            {/* Social Media */}
            <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg flex items-start gap-5">
              <div className="bg-white/30 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <i className="fab fa-instagram text-xl"></i>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Social Media</h4>
                <a href="https://www.instagram.com/mieyaminuntar" target="_blank" className="text-purple-100 hover:text-white transition-all">@mieyaminuntar</a>
              </div>
            </div>
          </div>

          {/* Peta */}
          <div className="lg:col-span-2 rounded-2xl shadow-lg overflow-hidden h-96 md:h-[500px] lg:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666300188849!2d106.7909289153329!3d-6.17539239552917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6f1f4f46f4b%3A0x2e3b2e3b2e3b2e3b!2sUniversitas%20Tarumanagara%20(UNTAR)%20-%20Kampus%20I!5e0!3m2!1sen!2sid!4v1678888888888"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
