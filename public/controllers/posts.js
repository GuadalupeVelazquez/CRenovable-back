import Post from '../models/posts.js'

export const createPost = (req, res) => {
    const newPost = req.body
    if(Object.keys(newPost).length != 0) 
        Post.Create(newPost, (err, data) =>  err ? res.json(err) : res.json(data))
}
export const getPosts = (req, res) => {
    Post.Read(req.params.id, req.params.field ?? 'product', (err, data) => err ? res.json(err) : res.json(data))
}
export const getFilteredPosts = (req, res) => {
    Post.Filter(req.query, (err, data) => err ? res.json(err) : res.json(data))
}
export const updatePost = (req, res) => {
    Post.Update(req.params.id, req.body, 
        (err,data) => err ? res.json(err) : res.json(data))
}
export const deletePost = (req, res) => {
    Post.Delete(req.params.id, (err, data) => err ? res.json(err) : res.json(data))
}