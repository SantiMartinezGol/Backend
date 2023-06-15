import { Router } from 'express';
import { getCart, addCart, addProduct, deleteProduct, updateCart, updateProduct, resetCart } from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const cartRouter = Router();

cartRouter.get('/:cid', auth, getCart);
cartRouter.post('/', auth, /*authorization,*/ addCart);
cartRouter.post('/:cid/product/:pid', auth, addProduct);
cartRouter.delete('/:cid/product/:pid', auth, deleteProduct);
cartRouter.put('/:cid', auth, updateCart);
cartRouter.put('/:cid/product/:pid', auth, updateProduct);
cartRouter.delete('/:cid', auth, resetCart);
 
export default cartRouter;