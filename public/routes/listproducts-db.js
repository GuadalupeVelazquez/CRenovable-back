const Product = require('./models/product.js'); 

// Ruta para listar los productos
app.get('/productos', (req, res) => {
    Product.find({}, (err, productos) => {
      if (err) {
        console.error('Error al listar los productos:', err);
        res.render('error', { error: err });
      } else {
        res.render('productos', { productos: productos });
      }
    });
  });

// Ejemplo de cómo utilizar la función para listar productos
listarProductos((err, productos) => {
  if (err) {
    console.error('Error al listar productos:', err);
  } else {
    console.log('Lista de productos:', productos);
  }
});