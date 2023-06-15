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
    const userId = req.user.id;
    const cm = new CartManager();
    const newCart = await cm.createCart(userId);
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
    const searchCart = await cm.getCart(req.params.cid);

    const pm = new ProductManager();
    const searchProduct = await pm.getProductById({pid:req.params.pid});

    const updatedCart = cm.addToCart(req.params.cid, req.params.pid)
    res.send({ status: 'Success', message: 'Cart updated' })
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
    const searchCart = await cm.getCart(req.params.cid);

    const pm = new ProductManager();
    const searchProduct = await pm.getProductById({pid:req.params.pid});

      const updatedCart = cm.deleteProduct(req.params.cid, req.params.pid);
      res.send({ status: 'Success', message: 'Cart updated' })
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
    const searchCart = await cm.getCart(req.params.cid);
    const products = req.body;
    const pm = new ProductManager();
    if (products) {
      for (const product of products) {
        const pid = product._id;
        const searchProduct = await pm.getProductById({pid:pid});
      }
    }
    const newCart = await cm.updateCart(req.params.cid, products)
    res.send({ status: 'success', newCart });
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
    const searchCart = await cm.getCart(req.params.cid);

    const pm = new ProductManager();
    const searchProduct = await pm.getProductById({pid:req.params.pid});
 
    const updatedCart = cm.updateProduct(req.params.cid, req.params.pid, req.body.pqty)
    res.send({ status: 'Success', message: 'Cart updated' })
    
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
    await cm.getCart(req.params.cid);
    const resetCart = cm.deleteAllProducts(req.params.cid)
    res.send({ status: 'Success', message: 'Cart reseted' })
  }
  catch (e) 
  {
    next(e);
  }
}


