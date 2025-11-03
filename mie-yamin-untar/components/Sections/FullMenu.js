const FullMenu = () => {
  return (
    <section id="menu" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <span className="section-tag tag-pink">Full Menu</span>
        <h2 className="text-4xl font-bold mb-4">Pilihan Menu Lengkap</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Mie segar, topping melimpah, dan harga ramah di kantong
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Menu Item 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex items-center gap-6">
            <img src="https://placehold.co/100x100/EAD9C8/333333?text=Mie+Original" alt="Mie Yamin Original" className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="text-left w-full">
              <h4 className="text-xl font-bold">Mie Yamin Original</h4>
              <p className="text-sm text-gray-600 mb-2">Mie klasik dengan ayam kecap manis</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-orange-500">Rp18.000</span>
                <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all">
                  Order
                </a>
              </div>
            </div>
          </div>
          {/* Menu Item 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex items-center gap-6">
            <img src="https://placehold.co/100x100/EAD9C8/333333?text=Mie+Level+5" alt="Mie Yamin Level 5" className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="text-left w-full">
              <h4 className="text-xl font-bold">Mie Yamin Level 5</h4>
              <p className="text-sm text-gray-600 mb-2">Pedas dan penuh rasa bagi para pecinta rempah</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-orange-500">Rp20.000</span>
                <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all">
                  Order
                </a>
              </div>
            </div>
          </div>
          {/* Menu Item 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex items-center gap-6">
            <img src="https://placehold.co/100x100/EAD9C8/333333?text=Mie+Complete" alt="Mie Yamin Complete" className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="text-left w-full">
              <h4 className="text-xl font-bold">Mie Yamin Complete</h4>
              <p className="text-sm text-gray-600 mb-2">Includes chicken, dumplings, meatballs, and sambal</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-orange-500">Rp25.000</span>
                <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all">
                  Order
                </a>
              </div>
            </div>
          </div>
          {/* Menu Item 4 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex items-center gap-6">
            <img src="https://placehold.co/100x100/EAD9C8/333333?text=Pangsit+Goreng" alt="Pangsit Goreng" className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="text-left w-full">
              <h4 className="text-xl font-bold">Pangsit Goreng (5 pcs)</h4>
              <p className="text-sm text-gray-600 mb-2">Renyah dan gurih</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-orange-500">Rp10.000</span>
                <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all">
                  Order
                </a>
              </div>
            </div>
          </div>
          {/* Menu Item 5 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex items-center gap-6">
            <img src="https://placehold.co/100x100/EAD9C8/333333?text=Es+Teh" alt="Es Teh" className="w-28 h-28 object-cover rounded-xl flex-shrink-0" />
            <div className="text-left w-full">
              <h4 className="text-xl font-bold">Es Teh</h4>
              <p className="text-sm text-gray-600 mb-2">teman minum yang sempurna</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-orange-500">Rp5.000</span>
                <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all">
                  Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullMenu;
