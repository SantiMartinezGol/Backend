import CartManager from "../managers/cartManager.js";
import ProductManager from "../managers/productManager.js";

const carro = [];
const cart = new CartManager();
const productos = new ProductManager()

export const getOne = async (req, res) => {
  const cid = req.params.cid;
  const currentCart = await cart.getCart(cid)
  if (!currentCart) {
    res.send({ status: 'Error', message: "Cart Not Found" })
  } else {
    res.send({ status: 'success', currentCart })
  }
}

export const save = async (req, res) => {
  const prod = {}
  const newCart = await cart.createCart(prod)
  res.send({ status: 'Success', newCart })
}

export const update = async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const searchCart = await cart.getCart(cid)

  if (!searchCart) {
    res.send({ status: 'Error', message: 'Cart Not Found' })
  }
  const data = searchCart.producto;

  const searchProduct = await productos.getProductById(pid)
  if (!searchProduct) {
    res.send({ status: 'Error', message: 'Product Not Found' })
  }

  //const data = searchCart.producto;

  const newData = data.map(p => {
    if (p._id === pid) {
      return {
        ...p,
        pqty: p.pqty + 1
      };
    }
    return p;
  });

  console.log(data);
  console.log(newData);

  if (newData !== data) {
    console.log("son iguales");
  } else {
    console.log("caca");
  }
  //const updatedCart = cart.addToCart(cid, pid, newData)
} 
