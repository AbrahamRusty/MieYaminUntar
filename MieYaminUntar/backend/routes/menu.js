// GET /api/menu/categories - Get all categories
router.get('/categories', (req, res) => {
  const categories = [
    { id: 'mie', name: 'Mie', description: 'Berbagai jenis mie' },
    { id: 'bihun', name: 'Bihun', description: 'Berbagai jenis bihun' },
    { id: 'kuetiaw', name: 'Kuetiaw', description: 'Berbagai jenis kuetiaw' },
    { id: 'topping', name: 'Topping', description: 'Pelengkap dan topping' },
    { id: 'minuman', name: 'Minuman', description: 'Minuman dan es' }
  ];

  res.json({ success: true, data: categories });
});

module.exports = router;
