import fs from 'fs';

class CartFileSystemRepository {
    #cart = []
    path = ``;
    lastId = 1

    constructor() {
        this.#cart = [];
        this.path = `../../../Cart.json`;
    } 

    async getOne(id) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        const carts = JSON.parse(cartFile)
        const cartDocument = carts.find((element) => element.cid === id);
        if (!cartDocument) 
        {
            throw new Error('Cart Not Found!')
        }

        return {
            id: cartDocument.cid,
            products: cartDocument.products.map((prod) => ({
              id: prod.pid,
              title: prod.title,
              description: prod.description,
              code: prod.code,
              price: prod.price,
              stock: prod.stock,
              category: prod.category,
              quantity: prod.pqty
            }))
        }
    }

    async create() {
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let newCart = JSON.parse(cartFile)
        this.lastId = Math.max(...newCart.map(c => c.cid)) + 1;
        let prod = []
        cid=  this.lastId
        newCart.push({
            "cid": cid,
            "producto": prod
        })
        await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, 2));
        return {
          cid: cid,
          products: []
        };
    }

    async insert(cid, pid) {         
        let prod = { "pid": pid, "pqty": 1 }
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)
        const currentCart = carts.find(el => el.cid === cid);
        if (!currentCart) 
        {
            throw new Error('Cart Not Found!')
        }
        
        const product = currentCart.producto.find(el => el.pid === pid);
        if (!product) 
        {
            currentCart.producto.push({ "pid": pid, "pqty": 1 })
        } 
        else 
        {
            let qty = product.pqty + 1
            currentCart.producto.push({ "pid": pid, "pqty": 1 })
            cartFile= {...cartFile, currentCart}
            await fs.promises.writeFile(this.path, JSON.stringify(cartFile, null, 2));
        }
        return{
            id: currentCart.cid,
            products: currentCart.producto.map(p => ({
              id: p.pid,
              pqty: p.pqty
            }))

        }
    } 

    async deleteOne(cid, pid) {
  
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)
        const currentCart = carts.find(el => el.cid === cid);
        if (!currentCart) 
        {
            throw new Error('Cart Not Found!')
        }
        
        const product = currentCart.producto.find(el => el.pid === pid);
        if (!product) 
        {
            throw new Error('Product Not Found!')
        } 
    
        currentCart = currentCart.producto.filter(el => el.pid === pid) ;
        cartFile= {...cartFile, currentCart}
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile, null, 2))
        
        return {
            id: currentCart.cid,
            products: currentCart.producto.map(p => ({
              id: p.pid,
              pqty: p.pqty
            }))
        }
    }
    
    async deleteAll(cid) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)
        const currentCart = carts.find(el => el.cid === cid);
        if (!currentCart) 
        {
            throw new Error('Cart Not Found!')
        }
        
        currentCart.producto = [];    
        cartFile= {...cartFile, currentCart};
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile, null, 2));
        
        return{
            cid: currentCart.cid,
        }
    }

    async updateAll(cid, products) {
        
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)
        const currentCart = carts.find(el => el.cid === cid);
        if (!currentCart) 
        {
            throw new Error('Cart Not Found!')
        }
        
         
        currentCart.producto = products
        cartFile= {...cartFile, currentCart}
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile, null, 2));
        
        return{
            cid: currentCart.cid,
            products: currentCart.producto.map(p => ({
              pid: p.pid,
              pqty: p.pqty
            }))
        }        
    }
    
    async updateOne(cid, pid, pqty) {
        let cartFile = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(cartFile)
        const currentCart = carts.find(el => el.cid === cid);
        if (!currentCart) 
        {
            throw new Error('Cart Not Found!')
        }   
        const product = currentCart.producto.find(el => el.pid === pid);
        if (!product) 
        {
            throw new Error('Product Not Found!')
        } 
        currentCart.producto.pqty = pqty;
        cartFile= {...cartFile, currentCart};
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile, null, 2));
        
        return{
            cid: currentCart.cid,
            products: currentCart.producto.map(p => ({
              pid: p.pid,
              pqty: p.pqty
            }))
        }    
    }
}        
export default CartFileSystemRepository;