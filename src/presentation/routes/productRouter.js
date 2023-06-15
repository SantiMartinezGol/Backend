import { Router } from 'express';
import {list, deleteOne, getOne, save, update } from '../controllers/productController.js';
import auth from '../middlewares/auth.js';

const productRouter = Router();

productRouter.get('/', list);
productRouter.get('/:pid', getOne );
productRouter.post('/', auth, save );
productRouter.put('/:pid', auth, update );
productRouter.delete('/:pid', auth, deleteOne);

export default productRouter;