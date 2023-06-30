import { Router } from 'express';
import auth from "../middlewares/auth.js";
import { list, deleteOne, getOne, save, update } from "../controllers/roleController.js";
import authorization from "../middlewares/authorization.js";

const roleRouter = Router();

roleRouter.get('/', auth, authorization('manageRole'), list);
roleRouter.get('/:id', auth, authorization('manageRole'), getOne);
roleRouter.post('/', auth, authorization('manageRole'), save);
roleRouter.put('/:id', auth, authorization('manageRole'), update);
roleRouter.delete('/:id', auth, authorization('manageRole'), deleteOne);

export default roleRouter;