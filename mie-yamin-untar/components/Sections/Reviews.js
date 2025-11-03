const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <span className="section-tag tag-blue">
          <i className="fas fa-star text-xs mr-1"></i> Customer Reviews
        </span>
        <h2 className="text-4xl font-bold mb-4">Review Pelanggan kami</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Real reviews from our beloved customers
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg text-left relative">
            <i className="fas fa-quote-left text-orange-200 text-6xl absolute top-6 left-6 opacity-50 -z-10"></i>
            <div className="text-yellow-400 mb-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="text-gray-700 italic mb-6">
              "Mie yamin terenak di sekitar kampus! Porsinya banyak, harganya ramah kantong mahasiswa. Toppingnya ngga pelit, rasanya emang juara!"
            </p>
            <p className="font-bold">Sarah Wijaya</p>
            <p className="text-sm text-gray-500">Mahasiswa Untar</p>
          </div>
          {/* Review 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg text-left relative">
            <i className="fas fa-quote-left text-orange-200 text-6xl absolute top-6 left-6 opacity-50 -z-10"></i>
            <div className="text-yellow-400 mb-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <p className="text-gray-700 italic mb-6">
              "Udah langganan dari jaman maba sampe sekarang kerja masih sering balik kesini. Rasanya konsisten, pelayanannya cepet, dan tempatnya nyaman."
            </p>
            <p className="font-bold">Budi Santoso</p>
            <p className="text-sm text-gray-500">Alumni Untar</p>
          </div>
          {/* Review 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg text-left relative">
            <i className="fas fa-quote-left text-orange-200 text-6xl absolute top-6 left-6 opacity-50 -z-10"></i>
            <div className="text-yellow-400 mb-4">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="text-gray-700 italic mb-6">
              "Level pedasnya beneran nampol! Mie Yamin Level 5-nya mantap. Cocok buat yang suka tantangan. Tapi yang original juga nagih. Perfecto!"
            </p>
            <p className="font-bold">Dina Rahma</p>
            <p className="text-sm text-gray-500">Food Blogger</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center items-center gap-2 text-lg text-gray-600">
          <div className="text-yellow-400">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
          <strong>4.8 average rating</strong> from 1,200+ reviews
        </div>
      </div>
    </section>
  );
};

export default Reviews;
