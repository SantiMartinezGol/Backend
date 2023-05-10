import { Router } from 'express';
import {list, deleteOne, getOne, save, update } from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('/', list);
productRouter.get('/:pid', getOne );
productRouter.post('/', save );
productRouter.put('/:id', update );
productRouter.delete('/:id', deleteOne);

export default productRouter;