const VisionMission = () => {
  return (
    <section id="vision" className="py-5 bg-light">
      <div className="container">
        <div className="row g-4">
          {/* Vision Card */}
          <div className="col-lg-6">
            <div className="vision-card vision-orange">
              <div className="decorative-circle"></div>
              <div className="decorative-square"></div>
              
              <div className="position-relative">
                <div className="icon-container icon-white">
                  <i className="fas fa-bullseye fa-2x"></i>
                </div>
                <h3 className="h1 fw-bold mb-3">VISI</h3>
                <p className="fs-5 mb-0">
                  Menjadi merek mi kampus teratas yang menggabungkan cita rasa dan teknologi.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mission Card */}
          <div className="col-lg-6">
            <div className="vision-card vision-white">
              <div className="icon-container icon-orange">
                <i className="fas fa-check-circle fa-2x"></i>
              </div>
              <h3 className="h1 fw-bold mb-4 text-dark">MISI</h3>
              <ul className="list-unstyled fs-5">
                <li className="mb-3 d-flex align-items-start">
                  <span className="text-warning me-3 mt-1">●</span>
                  <span className="text-dark">Menyajikan bahan halal berkualitas tinggi</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <span className="text-warning me-3 mt-1">●</span>
                  <span className="text-dark">Menyajikan bahan halal berkualitas tinggi ...</span>
                </li>
                <li className="d-flex align-items-start">
                  <span className="text-warning me-3 mt-1">●</span>
                  <span className="text-dark">Bangun komunitas pelanggan yang setia dengan manfaat eksklusif</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;