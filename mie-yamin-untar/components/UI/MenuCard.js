const MenuCard = ({ name, price, description, image, isPopular = false }) => {
  return (
    <div className="menu-card">
      <div className="card-image-container">
        <img
          src={image}
          alt={name}
          className="card-image"
        />
        {isPopular && (
          <span className="popular-badge">
            <i className="fas fa-star"></i> Most Popular
          </span>
        )}
      </div>
      <div className="card-content">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-price">{price}</h6>
        <p className="card-description">{description}</p>
        <button className="order-btn">
          Order Now
        </button>
      </div>

      <style jsx>{`
        .menu-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .card-image-container {
          position: relative;
        }

        .card-image {
          width: 100%;
          height: 12rem;
          object-fit: cover;
        }

        .popular-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #fbbf24;
          color: #92400e;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .card-price {
          font-size: 1.125rem;
          font-weight: 800;
          color: #ea580c;
          margin-bottom: 0.75rem;
        }

        .card-description {
          color: #4b5563;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .order-btn {
          background: #ea580c;
          color: white;
          padding: 0.75rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 1.125rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .order-btn:hover {
          background: #c2410c;
        }
      `}</style>
    </div>
  );
};

export default MenuCard;