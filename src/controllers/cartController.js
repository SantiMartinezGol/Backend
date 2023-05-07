import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";

const cart = new CartManager();
const productos = new ProductManager();

export const getOne = async (req, res) => {
  const cid = req.params.cid;
  const currentCart = await cart.getCart(cid);
  if (!currentCart) {
    res.send({ status: 'Error', message: "Cart Not Found" })
  } else {
    res.send({ status: 'Success', currentCart })
  }
}

export const save = async (req, res) => {
  const prod = [];
  const newCart = await cart.createCart(prod);
  res.send({ status: 'Success', newCart })
}

export const update = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const searchCart = await cart.getCart(cid);
  const searchProduct = await productos.getProductById(pid);

  if (!searchCart) {
    res.send({ status: 'Error', message: 'Cart Not Found' })

  } else if (!searchProduct) {
    res.send({ status: 'Error', message: 'Product Not Found' })

  } else {
    const updatedCart = cart.addToCart(cid, pid)
    res.send({ status: 'Success', message: 'Cart updated' })
  }
} 