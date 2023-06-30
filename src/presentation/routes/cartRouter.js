import { Router } from 'express';
import { getCart, addCart, addProduct, generateTicket, deleteProduct, updateCart, updateProduct, resetCart } from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';
import authAdmin from '../middlewares/authAdmin.js';

const cartRouter = Router();

cartRouter.get('/:cid', auth, authAdmin, authorization("manageCart"), getCart);
cartRouter.post('/', auth, authAdmin, authorization("manageCart"), addCart);
cartRouter.post('/:cid/product/:pid', auth, authAdmin, authorization("manageCart"), addProduct);
cartRouter.post('/:cid/purchase', auth, authAdmin, authorization("manageCart"), generateTicket);
cartRouter.delete('/:cid/product/:pid', auth, authAdmin, authorization("manageCart"), deleteProduct);
cartRouter.put('/:cid', auth, authAdmin, authorization("manageCart"), updateCart);

cartRouter.put('/:cid/product/:pid', auth, authAdmin, authorization("manageCart"), updateProduct);
cartRouter.delete('/:cid', auth, authAdmin, authorization("manageCart"), resetCart) 
 
export default cartRouter;