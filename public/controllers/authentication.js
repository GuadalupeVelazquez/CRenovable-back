import users from '/public/data/users.js';
import bcryptjs from 'bcrypt.js';
import jsonwebtokentoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function login(req, res){
    console.log(req, body);
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return res.status(400).send({status: 'error', message:'Los campos son incorrectos'});
      }
      const verificationUser = users.find(usuario => usuario.username === user);
      if (!verificationUser) {
        return res.status(400).send({status: 'Error', message:'Error durante login'});
     }

     const loginCorrect = await bcryptjs.compare(password, verificationUser.password);
     console.log(loginCorrect);
     if(!loginCorrect){
        return res.status(400).send({status: 'Error', message:'Error durante login'});
     }

     const token = jsonwebtokentoken.sign(
        {user:verificationUser.user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION});

        const cookieOption = {
            expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        }
        res.cookie("jwt",token,cookieOption);
        res.send({status:'ok', message:"Usuario logeado", redirect:"/admin"});
}

async function register(req, res){
    console.log(req.body);
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    const passwordRepeat = req.body.reingresar_password; 

    if(password!=passwordRepeat){
      return res.status(400).send({status: 'error', message:'Las contraseñas no coinciden'});
    }
    if(!user || !email || !password || !passwordRepeat){
      return res.status(400).send({status: 'error', message:'Los campos son incorrectos'});
    }

    const verificationUser = users.find(usuario => usuario.username === user)
        if (verificationUser) {
           return res.status(400).send({status: 'error', message:'Este usuario ya existe'});
        }
    
        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(password, salt);
        
        const newUser ={
            user, email, password: hashPassword
        }

        console.log(newUser);
        users.push(newUser);
        return res.status(201).send({status:"ok", message:'Usuario ${newUser.user} agregado'});
    }


export const methods ={
    login,
    register
}