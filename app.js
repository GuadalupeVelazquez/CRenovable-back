const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors')
const UserModel = require('./modules/Users')
const ProductModel = require('./modules/Products')
const session = require('express-session');

const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/cicloDB');

app.use(session({
  secret: 'mi_secreto', // Cambia esto a una cadena segura
  resave: false,
  saveUninitialized: true
}));


const User = mongoose.model('User', {
  username: String,
  password: String,
  email: String
});

app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { nombre, email, password, reingresar_password } = req.body;

  // Verifica si el usuario ya existe
  const existingUser = await User.findOne({ username: nombre });
  if (existingUser) {
    return res.send('El usuario ya existe');
  }

  // Verifica si las contraseñas coinciden
  if (password !== reingresar_password) {
    return res.send('Las contraseñas no coinciden');
  }

  // Crea un nuevo usuario en la base de datos
  const newUser = new User({ username: nombre, email, password });
  await newUser.save();

  res.redirect('http://localhost:3001/login');
});

app.post('/login', async (req, res) => {
  const { nombre, password } = req.body;

  // Busca el usuario en la base de datos
  const user = await User.findOne({ username: nombre });

  if (user && user.password === password) {
    // Inicia sesión y redirige al usuario a la página principal
    req.session.userId = user._id;
    return res.redirect('http://localhost:3001/');
  }

  res.send('Credenciales incorrectas');
});

app.get('/logout', (req, res) => {
  // Destruye la sesión y redirige al usuario a la página principal
  req.session.destroy(() => {
    res.redirect('/');
  });
});

//Listado de productos por categoria
app.get('/getProductsByCategory/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await ProductModel.find({ category: category });

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).send('No se encontraron productos en la categoría especificada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos por categoría');
  }
});

//Detalles de producto
app.get('/getProduct/:id', async (req, res) => {
  try {
    const productId = req.params.id
    const productDetail = await ProductModel.findOne({_id:productId});
    res.json(productDetail);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener listado de productos');
  }   
});

//Editar usuario

app.put('/editUser/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body;
    const updatedUserDetail = await UserModel.findByIdAndUpdate(userId, { $set: updatedFields }, { new: true });

    if (updatedUserDetail) {
      res.status(200).send('Usuario editado correctamente');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el usuario');
  }
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
