import { Router } from 'express'
import * as P from '../controllers/posts.js'

const postRouter = Router();

// Ruta Alternativas
postRouter.get      ( '/:field/:id', P.getPosts ); // Props tipo String
postRouter.get      ( '/filter', P.getFilteredPosts ); // Props tipo Number
// Rutas principales
postRouter.post     ( '/',      P.createPost ); // CREATE
postRouter.get      ( '/:id?',  P.getPosts   ); // READ
postRouter.put      ( '/:id?',  P.updatePost ); // UPDATE
postRouter.delete   ('/:id?',   P.deletePost ); // DELETE

export default postRouter;