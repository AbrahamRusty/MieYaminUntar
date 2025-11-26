import React, { useEffect, useState } from 'react';

const AllMenu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error('Failed to fetch menu:', err));
  }, []);

  return (
    <div>
      <h2>All Menu</h2>
      {menu.map(category => (
        <div key={category._id}>
          <h3>{category.category}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {category.items.map(item => (
              <div key={item._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 'auto' }} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMenu;
