import React, { useEffect, useState } from 'react';

const AllMenu = () => {
  const [menu, setMenu] = useState([]);

<<<<<<< Updated upstream


function AllMenuContent() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState('');
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch menu data from backend API on mount
  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3001/api/menus');
        if (!res.ok) throw new Error('Failed to fetch menu data');
        const data = await res.json();

        // data is array of categories, convert to object with category keys
        const categoriesObj = {};
        data.forEach(cat => {
          categoriesObj[cat.category] = cat.items;
        });
        setCategories(categoriesObj);

        // Set initial active category to first category from fetched data
        if (data.length > 0) setActiveCategory(data[0].category);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  // Intersection Observer for category highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.keys(categories).forEach((category) => {
      const element = document.getElementById(category);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Filter items by search term
  const filteredCategories = {};
  Object.entries(categories).forEach(([category, items]) => {
    filteredCategories[category] = items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;

  return (
    // Gunakan class .menu-section untuk latar abu-abu
    <div className="menu-section" id="menu">
      <Container>
        <Row>

          {/* 1. SIDEBAR KIRI (Permintaan #1) */}
          <Col lg={3}>
            <div className="menu-sidebar">
              <ListGroup as="ul" className="menu-sidebar-list">
                {Object.keys(categories).map(category => (
                  <li key={category}>
                    <a href={`#${category}`} className={activeCategory === category ? 'active' : ''}>
                      {category}
                    </a>
                  </li>
                ))}
              </ListGroup>
            </div>
          </Col>

          {/* 2. KONTEN KANAN */}
          <Col lg={9}>
            <div className="menu-content">

              {/* Search Bar (Permintaan #3) */}
              <InputGroup className="menu-search-bar mb-4">
                <InputGroup.Text><BsSearch /></InputGroup.Text>
                <Form.Control
                  placeholder="Cari menu favoritmu..."
                  aria-label="Cari menu"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              {/* Loop through filtered categories */}
              {Object.keys(filteredCategories).map((category) => (
                <div key={category} id={category}>

                  {/* Judul Grup (Kotak Hitam) */}
                  <div className="menu-group-title-box">
                    {category}
                  </div>

                  <Row className="gy-4 mb-5">
                    {filteredCategories[category].map((item, index) => (
                      <Col lg={4} md={6} sm={12} key={index}>
                        <MenuGridCard
                          title={item.title}
                          description={item.description}
                          price={item.price}
                          imageUrl={item.imageUrl}
                        />
                      </Col>
                    ))}
                  </Row>

                </div>
              ))}

            </div>
          </Col>

        </Row>
      </Container>

      {/* Floating Cart */}
      <FloatingCart />

      {/* Cart Modal */}
      <CartModal show={isCartOpen} onHide={() => setIsCartOpen(false)} />
=======
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
>>>>>>> Stashed changes
    </div>
  );
};

export default AllMenu;
