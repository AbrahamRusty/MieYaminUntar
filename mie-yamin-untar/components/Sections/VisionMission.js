const VisionMission = () => {
  return (
    <section id="vision" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
        {/* Visi */}
        <div className="bg-orange-500 text-white p-10 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/20 rounded-full"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/20 rounded-3xl transform rotate-45"></div>

          <div className="relative z-10">
            <div className="bg-white/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-bullseye text-3xl text-white"></i>
            </div>
            <h3 className="text-4xl font-bold mb-4">VISI</h3>
            <p className="text-xl">
              Menjadi merek mi kampus teratas yang menggabungkan cita rasa dan teknologi.
            </p>
          </div>
        </div>
        {/* Misi */}
        <div className="bg-white border border-gray-200 p-10 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-orange-500/10 rounded-3xl transform rotate-45"></div>

          <div className="relative z-10">
            <div className="bg-orange-500/20 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-check-circle text-3xl"></i>
            </div>
            <h3 className="text-4xl font-bold mb-6 text-gray-900">MISI</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-xl">
                <span className="text-orange-500 mr-3 mt-1">▪</span>
                <span className="text-gray-700">Menyajikan bahan halal berkualitas tinggi</span>
              </li>
              <li className="flex items-start text-xl">
                <span className="text-orange-500 mr-3 mt-1">▪</span>
                <span className="text-gray-700">Menyajikan bahan halal berkualitas tinggi ...</span>
              </li>
              <li className="flex items-start text-xl">
                <span className="text-orange-500 mr-3 mt-1">▪</span>
                <span className="text-gray-700">Bangun komunitas pelanggan yang setia dengan manfaat eksklusif</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
