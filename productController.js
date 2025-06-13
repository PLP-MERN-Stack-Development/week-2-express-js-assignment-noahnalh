let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Tablet", price: 750 },
];

const getProducts = (req, res) => {
  let result = [...products];

  const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (minPrice) result = result.filter((p) => p.price >= parseFloat(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= parseFloat(maxPrice));

  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + parseInt(limit));

  res.json({
    total: result.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginated,
  });
};

const getProduct = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

const createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: Date.now(), name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const { name, price } = req.body;
  product.name = name;
  product.price = price;
  res.json(product);
};

const deleteProduct = (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
