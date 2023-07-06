import { Router } from 'express';
import { getCart, addCart, addProduct, generateTicket, deleteProduct, updateCart, updateProduct, resetCart } from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';
import authAdmin from '../middlewares/authAdmin.js';

const cartRouter = Router();
//authAdmin,

cartRouter.get('/:cid', auth,  authorization("manageCart"), getCart);
cartRouter.post('/', auth,  authorization("manageCart"), addCart);
cartRouter.post('/:cid/product/:pid', auth, authorization("manageCart"), addProduct);
cartRouter.post('/:cid/purchase', auth, authorization("manageCart"), generateTicket);
cartRouter.put('/:cid', auth, authorization("manageCart"), updateCart);
cartRouter.put('/:cid/product/:pid', auth, authorization("manageCart"), updateProduct);
cartRouter.delete('/:cid/product/:pid', auth, authorization("manageCart"), deleteProduct);
cartRouter.delete('/:cid', auth, authorization("manageCart"), resetCart)  

export default cartRouter;