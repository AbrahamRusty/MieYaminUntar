const BestSellers = () => {
  return (
    <section id="best-sellers" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <span className="section-tag tag-blue">
          <i className="fas fa-trophy text-xs mr-1"></i> Best Sellers
        </span>
        <h2 className="text-4xl font-bold mb-4">Hidangan Andalan Kami</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Hidangan-hidangan ini membuat pelanggan kami terus kembali untuk menikmatinya lagi dan lagi
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <div className="relative">
              <img src="https://placehold.co/400x300/EAD9C8/333333?text=Mie+Yamin+Complete" alt="Mie Yamin Complete" className="w-full h-64 object-cover" />
              <span className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-sm font-medium px-3 py-1 rounded-full">
                <i className="fas fa-star text-xs mr-1"></i> Paling Populer
              </span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold">Mie Yamin Complete</h3>
              <p className="text-xl font-semibold text-orange-500 mb-4">Rp25.000</p>
              <p className="text-gray-600 mb-6 flex-grow">
                Favorit utama dengan keseimbangan sempurna antara rasa manis, gurih, dan pedas yang menggugah selera.
              </p>
              <a href="#" className="mt-auto bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-600 transition-all text-center">
                Pesan Sekarang
              </a>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <img src="https://placehold.co/400x300/EAD9C8/333333?text=Mie+Yamin+Level+5" alt="Mie Yamin Level 5" className="w-full h-64 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold">Mie Yamin Level 5</h3>
              <p className="text-xl font-semibold text-orange-500 mb-4">Rp20.000</p>
              <p className="text-gray-600 mb-6 flex-grow">
                Untuk mereka yang berani mencoba tantangan pedas ekstrem level tertinggi!
              </p>
              <a href="#" className="mt-auto bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-600 transition-all text-center">
                Pesan Sekarang
              </a>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <img src="https://placehold.co/400x300/EAD9C8/333333?text=Pansit+Goreng" alt="Pansit Goreng" className="w-full h-64 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold">Pangsit Goreng</h3>
              <p className="text-xl font-semibold text-orange-500 mb-4">Rp15.000</p>
              <p className="text-gray-600 mb-6 flex-grow">
                Pangsit goreng yang renyah dan gurih saat digigit, cocok sebagai pelengkap hidangan mie
              </p>
              <a href="#" className="mt-auto bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-600 transition-all text-center">
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
