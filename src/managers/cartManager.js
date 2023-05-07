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
    return newCart;
  }

  async addToCart(cid, pid) {
    return this.cartDao.insert(cid, pid);
  }
}
export default CartManager;
