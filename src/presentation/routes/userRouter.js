import { Router } from 'express';
import { list, deleteOne, getOne, save, update } from "../controllers/userController.js";
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const userRouter = Router();

userRouter.get('/', /*auth, authorization('managerUser'),*/ list);
userRouter.get('/:id', /*auth, authorization('managerUser'),*/ getOne);
userRouter.post('/', /*auth, authorization('managerUser'),*/ save);
userRouter.put('/:id', /*auth, */ update);
userRouter.delete('/:id', /*auth, authorization('managerUser'),*/ deleteOne); 

export default userRouter;