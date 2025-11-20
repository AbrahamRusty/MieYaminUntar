const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <span className="section-tag tag-orange">Our Story</span>
        <h2 className="text-4xl font-bold mb-4">About Mie Yamin Untar</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Dari gerobak makanan sederhana menjadi merek kampus yang dicintai
        </p>
        <div className="grid md:grid-cols-2 gap-12 items-center text-left">
          <img src="/about.jpg" alt="Gerobak Mie Yamin Untar" className="rounded-3xl shadow-xl w-full object-cover" />
          <div>
            <h3 className="text-3xl font-semibold mb-6">
              Sejak dibuka dekat Universitas Tarumanagara, Mie Yamin Untar telah menjadi favorit bagi mahasiswa dan warga lokal yang mencari rasa hangat dan menghibur.
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Bermula dari gerobak makanan kecil, kami telah berkembang menjadi merek modern yang menggabungkan resep tradisional dan kemudahan digital. Komitmen kami terhadap kualitas dan rasa tetap tidak berubah.
            </p>
            {/* Statistik About */}
            <div className="flex flex-col sm:flex-row justify-around gap-8 text-center">
              <div>
                <p className="text-5xl font-bold text-orange-500">5+</p>
                <p className="text-gray-600 text-lg">Tahun</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-orange-500">50+</p>
                <p className="text-gray-600 text-lg">Order Per Hari</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-orange-500">100%</p>
                <p className="text-gray-600 text-lg">Halal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
