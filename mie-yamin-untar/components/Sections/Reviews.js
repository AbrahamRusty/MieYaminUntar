import SectionTag from '../UI/SectionTag';

const Reviews = () => {
  const reviews = [
    {
      rating: 5,
      text: "Mie yamin terenak di sekitar kampus! Porsinya banyak, harganya ramah kantong mahasiswa. Toppingnya ngga pelit, rasanya emang juara!",
      author: "Sarah Wijaya",
      role: "Mahasiswa Untar"
    },
    {
      rating: 4.5,
      text: "Udah langganan dari jaman maba sampe sekarang kerja masih sering balik kesini. Rasanya konsisten, pelayanannya cepet, dan tempatnya nyaman.",
      author: "Budi Santoso",
      role: "Alumni Untar"
    },
    {
      rating: 5,
      text: "Level pedasnya beneran nampol! Mie Yamin Level 5-nya mantap. Cocok buat yang suka tantangan. Tapi yang original juga nagih. Perfecto!",
      author: "Dina Rahma",
      role: "Food Blogger"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };

  return (
    <section id="reviews" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <SectionTag variant="blue">
            <i className="fas fa-star me-1"></i> Customer Reviews
          </SectionTag>
          <h2 className="display-5 fw-bold mb-3">Review Pelanggan kami</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Real reviews from our beloved customers
          </p>
        </div>
        
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 position-relative">
                <i className="fas fa-quote-left quote-icon"></i>
                <div className="card-body position-relative">
                  <div className="rating-stars mb-3">
                    {renderStars(review.rating)}
                  </div>
                  <p className="card-text text-muted fst-italic mb-4">
                    "{review.text}"
                  </p>
                  <div>
                    <p className="fw-bold mb-1">{review.author}</p>
                    <p className="text-muted small">{review.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5">
          <div className="d-inline-flex align-items-center gap-2 fs-5 text-muted">
            <div className="rating-stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
            <strong>4.8 average rating</strong> from 1,200+ reviews
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;