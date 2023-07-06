import CartManager from '../../domain/managers/cartManager.js';
import ProductManager from '../../domain/managers/productManager.js';


export const getCart = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();
    const currentCart = await cm.getCart(req.params.cid);

    res.send({ status: 'Success', currentCart });
  }
  catch (e) 
  {
    next(e);
  }
}

export const addCart = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();
    const newCart = await cm.createCart(req.user.id);

    res.send({ status: 'Success', newCart })
  }
  catch (e) 
  {
    next(e)
  }
}

export const addProduct = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();
    const updatedCart = await cm.addToCart(req.params.cid, req.params.pid)

    res.send({ status: 'Success',  message: 'Cart updated', updatedCart })
  }
  catch (e) 
  {
    next(e);
  }
}

export const deleteProduct = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();
    const updatedCart = await cm.deleteProduct(req.params.cid, req.params.pid);
    
    res.send({ status: 'Success', message: 'Cart updated', updatedCart })
  }
  catch (e) 
  {
    next(e);
  }
}

export const updateCart = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();
    const newCart = await cm.updateCart(req.params.cid, req.body)
 
    res.send({ status: 'success', message: 'Cart updated', newCart });
  }
  catch (e) 
  {
    next (e) 
  }
}

export const updateProduct = async (req, res, next) => {

  try
   {
    const cm = new CartManager();
    const updatedCart = await cm.updateProduct(req.params.cid, req.params.pid, req.body.pqty)

    res.send({ status: 'Success', message: 'Cart updated',updatedCart })
    
  }
  catch (e) 
  {
    next(e)
  }
}

export const resetCart = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();
    const resetCart = cm.deleteAllProducts(req.params.cid);

    res.send({ status: 'Success', message: 'Cart reseted' })
  }
  catch (e) 
  {
    next(e);
  }
}

export const generateTicket = async (req, res, next) => {
  try 
  {
    const cm = new CartManager();

    const newTicket = await cm.generateTicket(req.params.cid, req.user.email);
    res.send({ status: 'Success', newTicket })
  }
  catch (e) 
  {
    next(e)
  }
}

