module.exports = (mongoose) => {
  const Product = mongoose.model(
    "product",
    mongoose.Schema({
      productId: Number,
      name: String,
      price: Number,
      stock: Number,
    })
  );
  return Product;
};
