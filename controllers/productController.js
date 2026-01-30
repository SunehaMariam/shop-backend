const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// ADD product
exports.addProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  const product = new Product({ name, price, stock });
  await product.save();

  res.json(product);
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};
