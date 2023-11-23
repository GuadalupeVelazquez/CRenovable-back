import { posts } from '../data/posts.js';

function Post(post){
  Object.keys(post).forEach(k => this[k] = Post[k])
}

Post.Create = (post, callBack) => {
  posts.push(post)
  return callBack(null, {message: "publicacion exitosa"})
}
Post.Read = (id, key, callBack) => {
  const data = !id ? posts :
    posts.filter(p => p.postId == id || p[key].toLowerCase() == id.toLowerCase())
  if (data.length != 0) return callBack(null, data)
  else return callBack({message: "no se encontro la publicacion"}, null);
}
Post.Filter = ({min, max, stock}, callBack) => {
  const data = []
  for(let i in posts) if( 
      max ? posts[i].price <= max : true &&
      min ? posts[i].price >= min : true &&
      stock ? posts[i].stock >= stock : true
  ) data.push(posts[i])
  return callBack(null, data)
}
Post.Update = (id, data, callBack) => {
  for(let i in posts)
  if(posts[i].postId == id){ 
    posts[i] = data 
    return callBack(null, {message: "actualizacion exitosa", post: posts[i]})
  }
  return callBack({message: "No se pudo realizar la actualizacion"}, null)
}
Post.Delete = (id, callBack) => {
  for (let i in posts) 
  if (posts[i].postId == id){ 
    posts.splice(i, 1) 
    return callBack(null, {message: "publicacion eliminada" , total: posts.length})
  }
  return callBack({message: "No se pudo eliminar la publicacion"}, null);
}

export default Post;