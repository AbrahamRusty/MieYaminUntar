const Hero = () => {
  return (
    <section id="home" className="hero-gradient pt-16 pb-24">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Teks Hero */}
        <div>
          <span className="section-tag tag-orange">
            <i className="fas fa-star text-xs mr-1"></i> Campus Favorite Since 2018
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Campus Taste,
            <span className="text-orange-500">Endless Flavor</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Mie autentik yang dibuat dengan bahan segar, topping yang melimpah, dan resep yang selalu berhasil. Setiap gigitan mengembalikan kenangan.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#" className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 transition-all text-center">
              Join Loyalty Program
            </a>
            <a href="#menu" className="bg-green-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-green-600 transition-all text-center">
              Order Now
            </a>
          </div>
          {/* Statistik */}
          <div className="mt-12 flex gap-8">
            <div>
              <p className="text-4xl font-bold text-orange-500">10k+</p>
              <p className="text-gray-600">Happy Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500 flex items-center">
                4.8 <i className="fas fa-star text-yellow-400 ml-2 text-3xl"></i>
              </p>
              <p className="text-gray-600">Customer Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500">5+</p>
              <p className="text-gray-600">Years Serving</p>
            </div>
          </div>
        </div>
        {/* Gambar Hero */}
        <div className="flex justify-center">
          <img src="https://placehold.co/600x450/FDEBD0/333333?text=Mie+Yamin+Lezat" alt="Mie Yamin Lezat" className="rounded-3xl shadow-2xl object-cover w-full max-w-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
