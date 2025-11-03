const MenuCard = ({ name, price, description, image, isPopular = false }) => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="position-relative">
        <img 
          src={image} 
          alt={name} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'cover' }}
        />
        {isPopular && (
          <span className="most-popular">
            <i className="fas fa-star me-1"></i> Most Popular
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{name}</h5>
        <h6 className="card-subtitle mb-2 text-warning fw-bold">{price}</h6>
        <p className="card-text text-muted flex-grow-1">{description}</p>
        <a href="#" className="btn btn-warning text-white fw-bold mt-auto">
          Order Now
        </a>
      </div>
    </div>
  );
};

export default MenuCard;