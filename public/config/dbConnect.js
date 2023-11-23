const mongoose = require('mongoose');

const db_uri = 'mongodb://localhost:27017/prueba';

module.exports = () =>{

    const connect = () =>{
      mongoose.connect(
        db_uri,
        {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        (err) => {
          if(err){
            console.log('Database Connection Error')
          } else {
            console.log('Database Connected')
          }
        }
      )
    }

    connect();
  
}