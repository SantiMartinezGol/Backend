import { Router } from 'express';
import {list, deleteOne, getOne, save, update } from '../controllers/productController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const productRouter = Router();

productRouter.get('/', list);
productRouter.get('/:pid', getOne );
productRouter.post('/', auth, authorization("manageProduct"), save );
productRouter.put('/:pid', auth, authorization("manageProduct"), update );
productRouter.delete('/:pid', auth, authorization("manageProduct"),deleteOne);

export default productRouter;