const mongoose = require('mongoose');

// Definir el esquema del modelo
const productSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
  stock: Number,
  categoria: String,
});

// Crear el modelo "Product" basado en el esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;