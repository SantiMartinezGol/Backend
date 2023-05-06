import CartMongooseDao from "../daos/CartMongooseDao.js";

class CartManager {
  constructor() {
    this.cartDao = new CartMongooseDao();

  }

  async getCart(id) {
    return this.cartDao.getOne(id);
  }

  async createCart(prod) {
    const newCart = await this.cartDao.create(prod);
    console.log(newCart);
    return newCart;
  }

  async addToCart(cid, pid, data) {

    data.map
    //const carrito = await this.cartDao.getOne(cid)

    //console.log(data);

    //const filtrado = carrito.producto.find(pid = pid)
    //  console.log(filtrado);

    //let prod = { "pid": pid, "pqty": pqty + 1 }
    return //this.cartDao.updateOne(cid,prod);
  }
}
export default CartManager;
