import CartMongooseDao from "../daos/cartMongooseDao.js"

class CartManager {
  constructor() {
    this.cartDao = new CartMongooseDao();
  }

  async getCart(id) {

    const currentCart = this.cartDao.getOne(id);
 
   return this.cartDao.getOne(id);  
  }

  async createCart() {
    const newCart = await this.cartDao.create();
    return newCart;
  }

  async addToCart(cid, pid) {
    return this.cartDao.insert(cid, pid);
  }

  async deleteProduct(cid, pid) {
    return this.cartDao.deleteOne(cid, pid);
  }

  async deleteAllProducts(cid ) {
    return this.cartDao.deleteAll(cid);
  }

  async updateCart(cid, products) {
    return this.cartDao.updateAll(cid, products);
  }

  async updateProduct(cid, pid, pqty) {
    return this.cartDao.updateOne(cid, pid, pqty);
  }

}
export default CartManager;
