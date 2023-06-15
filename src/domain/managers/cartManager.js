import CartMongooseDao from "../../data/daos/cartMongooseDao.js"
import userManager from "../managers/userManager.js";
import idValidation from "../validations/shared/idValidation.js";



class CartManager {
  constructor() {
    this.cartDao = new CartMongooseDao();
  }

  async getCart(id) 
  {
    await idValidation.parseAsync({id:id});
    return this.cartDao.getOne(id);
  }

  async createCart(userId) {
    const um = new userManager();
    await um.getOne({id: userId});

    const newCart = await this.cartDao.create();
    
    await um.updateOne(userId,{cart:newCart.cid.toString() })
 
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
