import SectionTag from '../UI/SectionTag';

const About = () => {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <SectionTag variant="orange">Our Story</SectionTag>
          <h2 className="display-5 fw-bold mb-3">About Mie Yamin Untar</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Dari gerobak makanan sederhana menjadi merek kampus yang dicintai
          </p>
        </div>
        
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img 
              src="https://placehold.co/500x600/E0E0E0/333333?text=Gerobak+Mie+Yamin+Jadul" 
              alt="Gerobak Mie Yamin Untar" 
              className="img-fluid rounded-4 shadow"
            />
          </div>
          
          <div className="col-lg-6">
            <h3 className="h2 fw-semibold mb-4">
              Sejak dibuka dekat Universitas Tarumanagara, Mie Yamin Untar telah menjadi favorit bagi mahasiswa dan warga lokal yang mencari rasa hangat dan menghibur.
            </h3>
            
            <p className="text-muted mb-5 fs-5">
              Bermula dari gerobak makanan kecil, kami telah berkembang menjadi merek modern yang menggabungkan resep tradisional dan kemudahan digital. Komitmen kami terhadap kualitas dan rasa tetap tidak berubah.
            </p>
            
            {/* Statistics */}
            <div className="row text-center">
              <div className="col-4">
                <p className="display-6 fw-bold text-warning mb-1">5+</p>
                <p className="text-muted">Tahun</p>
              </div>
              <div className="col-4">
                <p className="display-6 fw-bold text-warning mb-1">50+</p>
                <p className="text-muted">Order Per Hari</p>
              </div>
              <div className="col-4">
                <p className="display-6 fw-bold text-warning mb-1">100%</p>
                <p className="text-muted">Halal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;