import CartManager from '../managers/cartManager.js';
import ProductManager from '../managers/productManager.js';

const cm = new CartManager();
const pm = new ProductManager();

export const getCart = async (req, res) => {
  const cid = req.params.cid;
  const currentCart = await cm.getCart(cid);
  if (!currentCart) {
    res.send({ status: 'Error', message: 'Cart Not Found' })
  } else {
    res.send({ status: 'Success', currentCart })
  }
}

export const addCart = async (req, res) => {
  try{
    const newCart = await cm.createCart();
    res.send({ status: 'Success', newCart })
  } catch (e){
    res.send({ status: 'Error',  message: "Can't create cm" })
  }
}

export const addProduct = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  try{
    const searchCart = await cm.getCart(cid);
    const searchProduct = await pm.getProductById(pid);

    if (!searchCart) {
      res.send({ status: 'Error', message: 'Cart Not Found' })

    } else if (!searchProduct) {
      res.send({ status: 'Error', message: 'Product Not Found' })

    } else {
      const updatedCart = cm.addToCart(cid, pid)
      res.send({ status: 'Success', message: 'Cart updated' })
    }
  } catch (e){
      res.send({ status: 'Error', message: 'Unexpected Error' })
  }
} 

export const deleteProduct = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    const searchCart = await cm.getCart(cid);
    const searchProduct = await pm.getProductById(pid);

    if (!searchCart) {
      res.send({ status: 'Error', message: 'Cart Not Found' })

    } else if (!searchProduct) {
      res.send({ status: 'Error', message: 'Product Not Found' })

    } else {
      const updatedCart = cm.deleteProduct(cid, pid)
      res.send({ status: 'Success', message: 'Cart updated' })
    }
  } catch (e) {
    res.send({ status: 'Error', message: 'Unexpected Error' })
  }  
}

export const updateCart = async (req, res) => {
  const cid = req.params.cid;
  const products = req.body;
  
  try {
    const searchCart = await cm.getCart(cid);
    if (!searchCart) {
      res.send({ status: 'Error', message: 'Cart Not Found' })
      return
    }
    if (products) {
      for (const product of products) {
        const pid = product._id;
        const searchProduct = await pm.getProductById(pid);
        if (!searchProduct) {
          res.send({ status: 'Error', message: 'Product Not Found' });
          return;
        }
      }
    } else {
      res.send({ status: 'Error', message: 'Products Not Found' });
    }
    const newCart = await cm.updateCart(cid, products)
    res.send({ status: 'success', newCart });
  }
  catch (e) {
    res.send({ status: 'Error', message: 'Products Not Added' })
    }
}

export const updateProduct = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity= req.body;
  const pqty = quantity.pqty
  try{
    const searchCart = await cm.getCart(cid);
    const searchProduct = await pm.getProductById(pid);

    if (!searchCart) {
      res.send({ status: 'Error', message: 'Cart Not Found' })
    } else if (!searchProduct) {
      res.send({ status: 'Error', message: 'Product Not Found in Cart' })
    } else {
      const updatedCart = cm.updateProduct(cid, pid, pqty)
      res.send({ status: 'Success', message: 'Cart updated' })
    }
  } 
  catch (e) {
    res.send({ status: 'Error', message: 'Product Not Updated' })
  }
}

export const resetCart = async (req, res) => {
  const cid = req.params.cid;
  const searchCart = await cm.getCart(cid);

  if (!searchCart) {
    res.send({ status: 'Error', message: 'Cart Not Found' })
  } else {
    const resetCart = cm.deleteAllProducts(cid)
    res.send({ status: 'Success', message: 'Cart reseted' })
  }
}


