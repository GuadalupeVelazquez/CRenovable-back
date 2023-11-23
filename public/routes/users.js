import { Router } from "express"
import * as User from "../controllers/users.js"
const userRouter = Router();

userRouter.post    ( '/',     User.createUser   ); // CREATE
userRouter.get     ( '/:id?', User.getUsers     ); // READ
userRouter.put     ( '/:id?', User.updateUser   ); // UPDATE
userRouter.delete  ( '/:id?', User.deleteUser   ); // DELETE

export default userRouter;