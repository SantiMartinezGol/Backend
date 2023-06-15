import { Router } from 'express';
import { getCart, addCart, addProduct, deleteProduct, updateCart, updateProduct, resetCart } from '../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/:cid', getCart); //aplicar populate
cartRouter.post('/', addCart);
cartRouter.post('/:cid/product/:pid', addProduct);
cartRouter.delete('/:cid/product/:pid', deleteProduct);
cartRouter.put('/:cid', updateCart);
cartRouter.put('/:cid/product/:pid', updateProduct);
cartRouter.delete('/:cid', resetCart);
 
export default cartRouter;