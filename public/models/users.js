import { users } from '../data/users.js';

const User = function(name, email,password ,data){
  this.userName = name;
  this.email = email;
  this.password = password;
  this.userData = data;
}
User.Create = (User, callBack) =>{
  users.push(User)
  return callBack(null, User)
}
User.Read = (id, callBack) =>{
  const data = !id ? users : 
    users.filter(u => u.username.toLowerCase() === id.toLowerCase())
  if (data.length != 0) return callBack(null, data)
  else return callBack({message: "no se encontro el usuario"}, null);
}
User.Update = (id, data, callBack) => {
  for(let i in users)
  if(users[i].username.toLowerCase() === id.toLowerCase()){ 
    users[i] = data 
    return callBack(null, {message: "actualizacion exitosa", user: users[i]})
  }
  return callBack({message: "no se encontro el usuario"}, null);
}
User.Delete = (id, callBack) =>{
  for (let i in users) 
  if (users[i].username.toLowerCase() === id.toLowerCase()){ 
    users.splice(i, 1) 
    return callBack(null, {message: "usuario eliminado" , total: users.length})
  }
  return callBack({message: "no se encontro el usuario"}, null);
}
export default User;