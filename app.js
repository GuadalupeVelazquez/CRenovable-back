const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors')
const UserModel = require('./modules/Users')
const ProductModel = require('./modules/Products')

const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/cicloDB');

//Login
app.post('/loginUser', async (req, res) => {
  try {
    const userName = req.body.name;
    const userPassword = req.body.password;

    const user = await UserModel.findOne({ name: userName, password: userPassword });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al loguearse');
  }
});

//Register
app.post('/createUser', async (req, res) => {
  try {
    await UserModel.create(req.body);
    res.status(200).send('Éxito en el registro!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
      }
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
