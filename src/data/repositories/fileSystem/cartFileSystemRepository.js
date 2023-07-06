import fs from 'fs';
import { generateUniqueKey } from "../../../shared/index.js";
import Cart from '../../../domain/entities/cart.js'

class CartFileSystemRepository {
    #cart = []
    path = ``;
    lastId = 1

    constructor() {
        this.#cart = [];
        this.path = `./src/Cart.json`;
    }

    async getOne(id) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(cartFile);

        const cartDocument = carts.find((c) => c.cid === id);
     
        return new Cart ({
            id: cartDocument.cid,
            products: cartDocument.products.map(p => ({
                id: p.pid,
                pqty: p.pqty
            }))
        });
    }

    async create() {
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)

        const size = 24
        const cid = generateUniqueKey(size);

        const currentCart= ({cid:cid, products:[]})

        carts.push({
            cid: cid,
            products: []
        });
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return new Cart ({
            id: currentCart.cid,
            products: currentCart.products.map(p => ({
                id: p.pid,
                pqty: p.pqty
            }))
        });
    }

    async insert(cid, pid) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        let carts = JSON.parse(cartFile);

        const currentCartIndex = carts.findIndex((el) => el.cid === cid);
        if (currentCartIndex === -1) 
        {
            throw new Error('Cart Not Found!');
        }
        const currentCart = carts[currentCartIndex];

        const productIndex = currentCart.products.findIndex((p) => p.pid === pid);
        if (productIndex === -1) {
            currentCart.products.push({ pid, pqty: 1 });
        } else {
            currentCart.products[productIndex].pqty++;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return new Cart ({
            id: currentCart.cid,
            products: currentCart.products.map(p => ({
                id: p.pid,
                pqty: p.pqty
            }))
        });
    }

    async deleteOne(cid, pid) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        let carts = JSON.parse(cartFile);

        const currentCartIndex = carts.findIndex((el) => el.cid === cid);
        const currentCart = carts[currentCartIndex];

        const productIndex = currentCart.products.findIndex(p => p.pid === pid);
        if (productIndex === -1) 
        {
            throw new Error('Product Not Found!');
        }

        currentCart.products.splice(productIndex, 1);

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
      
        return new Cart ({
            id: currentCart.cid,
            products: currentCart.products.map(p => ({
                id: p.pid,
                pqty: p.pqty
            }))
        })
    }

    async deleteAll(cid) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)
        
        const currentCartIndex = carts.findIndex((el) => el.cid === cid);
        const currentCart = carts[currentCartIndex];
        currentCart.products = [];

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return {
            cid: currentCart.cid,
        }
    }

    async updateAll(cid, products) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        let carts = JSON.parse(cartFile);

        const currentCartIndex = carts.findIndex((el) => el.cid === cid);
        const currentCart = carts[currentCartIndex];
        currentCart.products = products;
        
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return new Cart ({
            id: currentCart.cid,
            products: currentCart.products.map(p => ({
                id: p.pid,
                pqty: p.pqty
            }))
        });
    }

    async updateOne(cid, pid, pqty) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        let carts = JSON.parse(cartFile);

        const currentCart = carts.find(el => el.cid === cid);
       
        const productIndex = currentCart.products.findIndex((el) => el.pid === pid);
        if (productIndex === -1) 
        {
            currentCart.products.push({ pid: pid, pqty: pqty });
        } else { 
            currentCart.products[productIndex].pqty = pqty;
        }
        
        const cartIndex = carts.findIndex(c => c.cid === currentCart.cid);
        carts[cartIndex] = currentCart;
        

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

        return new Cart ({
            id: currentCart.cid,
            products: currentCart.products.map(p => ({
                id: p.pid,
                pqty: p.pqty
            }))
        });
    } 
}
export default CartFileSystemRepository;