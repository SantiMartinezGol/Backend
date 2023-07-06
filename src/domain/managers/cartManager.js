import UserManager from "./userManager.js";
import idValidation from "../validations/shared/idValidation.js";
import container from "../../container.js"
import ProductManager from "./productManager.js";
import { generateUniqueKey } from "../../shared/index.js";

class CartManager {
  constructor() {
    this.cartRepository = container.resolve("CartRepository");
    this.ticketRepository = container.resolve("TicketRepository")
  }

  async getCart(id) {
    await idValidation.parseAsync({ id: id });

    const cartDocument= await this.cartRepository.getOne(id);
    if (!cartDocument) 
    {
        throw new Error('Cart Not Found!')
    }
    return cartDocument
  }

  async createCart(userId) {
    
    const um = new UserManager();
    const user = await um.getOne({ id: userId });
    
    const { id, ...rest } = user;
    const newCart = await this.cartRepository.create();
    
    const data = { ...rest, cart: newCart.id.toString() };
    await um.updateOne(userId, data);
    
    return newCart;
  }

  async addToCart(cid, pid) {
    const a=await this.getCart(cid);
    const pm = new ProductManager();
    const b= await pm.getProductById({ pid: pid });

    return this.cartRepository.insert(cid, pid);
  }

  async deleteProduct(cid, pid) {
    await this.getCart(cid);
    const pm = new ProductManager();
    await pm.getProductById({pid:pid});

    return this.cartRepository.deleteOne(cid, pid);
  }

  async deleteAllProducts(cid) {
    await this.getCart(cid);
    
    return this.cartRepository.deleteAll(cid);
  }

  async updateCart(cid, products) {
    
    await this.getCart(cid)
    const pm = new ProductManager();
    if (products) {
      for (const product of products) {
        const pid = product.pid;
        const searchProduct = await pm.getProductById({pid:pid});
      }
    }

    return this.cartRepository.updateAll(cid, products);
  }

  async updateProduct(cid, pid, pqty) {
    await this.getCart(cid);
    const pm = new ProductManager();
    await pm.getProductById({pid:pid});
    const updatedCart= await this.cartRepository.updateOne(cid, pid, pqty);
    return updatedCart;
  }

  async generateTicket(cid, purchaser) { 
    const cart = await this.getCart(cid);
    const purchased = [];
    let amount = 0;
    let purchase_datetime;
    let code;
    let cartOutOfStock;
  
    await Promise.all(cart.products.map(async (prod) => {
      if (prod.stock >= prod.pqty) 
      {
        purchased.push(prod);
        amount = amount + prod.pqty * prod.price;
        await this.deleteProduct(cid, prod.pid.toString());

        const pm = new ProductManager();
        const data = await pm.getProductById({ pid: prod.pid.toString() });
        data.stock = data.stock - prod.pqty;
        await pm.updateProduct(data.id.toString(), data);
      } 
      else 
      {
        const outOfStock = prod.pqty - prod.stock;
        prod.pqty = prod.stock;
        purchased.push(prod);
        amount = amount + prod.pqty * prod.price;
        await this.updateProduct(cid, prod.pid.toString(), outOfStock);
  
        const pm = new ProductManager();
        const data = await pm.getProductById({ pid: prod.pid.toString() });
        data.stock = data.stock - prod.pqty;
        await pm.updateProduct(data.id.toString(), data);
      }
    }));
  
    purchase_datetime = new Date();
   
    const size=8
    code = generateUniqueKey(size);
  
    const ticketData = { code, purchase_datetime, purchaser, amount };
    await this.ticketRepository.create(ticketData);
  
    cartOutOfStock = await this.getCart(cid);
  
    return {
      code: code,
      amount: amount,
      purchaser: purchaser,
      purchase_datetime: purchase_datetime,
      cartOutOfStock: cartOutOfStock
    };
  }
}
export default CartManager;
