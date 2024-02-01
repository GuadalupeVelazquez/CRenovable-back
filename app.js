const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const UserModel = require('./modules/Users');
const ProductModel = require('./modules/Products');

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(session({
    secret: 'tu_secreto_aqui', // Cambia esto por una clave secreta fuerte
    resave: false,
    saveUninitialized: true,
}));
mongoose.connect('mongodb://127.0.0.1:27017/cicloDB');
// Middleware para verificar la autenticación
const checkAuthentication = (req, res, next) => {
    if (req.session && req.session.user) {
        // Si el usuario está autenticado, continúa con la siguiente middleware/ruta
        next();
    } else {
        // Si el usuario no está autenticado, devuelve un error 403
        res.status(403).json({ error: 'No has iniciado sesión.' });
    }
};
app.use('/rutaProtegida', checkAuthentication);
// Login de usuario
app.post('/loginAndRegister', async (req, res) => {
    try {
        // Verificar si el usuario ya está autenticado
        if (req.session.user) {
            return res.status(403).json({ error: 'Ya has iniciado sesión. Cierra la sesión actual antes de iniciar otra.' });
        }

        // Obtener credenciales del cuerpo de la solicitud
        const { username, password } = req.body;

        // Intentar encontrar al usuario en la base de datos
        let user;
        try {
            user = await UserModel.findOne({ username, password });
        } catch (dbError) {
            console.error('Error en la consulta a la base de datos:', dbError);
            return res.status(500).json({ success: false, error: 'Error en el servidor' });
        }

        // Verificar si se encontró un usuario
        if (user) {
            // Establecer la información de sesión
            req.session.user = user;
            return res.json({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
            // Si no se encontró el usuario, devolver un error de credenciales inválidas
            return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
        }
    } catch (error) {
        // Manejar otros errores no especificados
        console.error(error);
        return res.status(500).json({ success: false, error: 'Error en el servidor' });
    }
});
// Registro de usuario
app.post('/createUser', async (req, res) => {
    try {
        console.log('Datos recibidos en createUser:', req.body);
        const { username, email, password, nombreCompleto, pais, ciudad } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log('Correo electrónico ya registrado');
            return res.status(400).json({ error: 'Correo electrónico ya registrado' });
        }

        // Crear nuevo usuario
        const newUser = new UserModel({
            username,
            email: email.toLowerCase(),
            password,
            name: nombreCompleto,
            country: pais,
            city: ciudad,
            // Otros campos que puedas necesitar
        });

        // Guardar en la base de datos
        await newUser.save();

        console.log('Usuario registrado:', newUser);
        res.status(201).json({ success: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en createUser:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});
// Ruta para cerrar sesión
/*app.get('/logout', (req, res) => {
    // Destruir la sesión
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).send('Error al cerrar sesión');
        } else {
            // Redirigir al usuario a la página de inicio
            res.redirect('/createUser');
        }
    });
});*/
app.get('/logout', (req, res) => {
    // Puedes realizar acciones de cierre de sesión aquí
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            res.status(500).send('Error al cerrar sesión');
        } else {
            res.status(200).send('Sesión cerrada exitosamente');
        }
    });
});

// Listado de productos por categoría
app.get('/getProductsByCategory/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await ProductModel.find({ category });

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

// Detalles de producto
app.get('/getProduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productDetail = await ProductModel.findOne({ _id: productId });
        res.json(productDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener detalles del producto');
    }
});

// Editar usuario
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