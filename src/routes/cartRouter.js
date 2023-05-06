import { Router } from 'express';
import { getOne, save, update } from '../controllers/cartController.js';

const cartRouter = Router();

cartRouter.get('/:cid', getOne);
cartRouter.post('/', save);
cartRouter.post('/:cid/product/:pid', update);

export default cartRouter;