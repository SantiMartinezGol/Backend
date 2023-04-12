import fs from 'fs';

class CartManager {
    #cart = []
    path = ``;
    lastId = 1

    constructor() {
        this.#cart = [];
        this.path = `./src/Cart.json`;
    }

    async getCart(cid) {
        try {
            if (!cid) {
                let cartFile = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(cartFile)
            } else {
                let cartFile = await fs.promises.readFile(this.path, "utf-8")
                const cartOb = JSON.parse(cartFile)
                const pedido = cartOb.find((elemento) => elemento.cid === cid);
                if (pedido == undefined) {
                    return ("Pedido no encontrado");
                }
                return pedido
            }

        } catch (e) {
            await fs.promises.writeFile(this.path, "[]")
            return ("El carrito no contiene producto")
        }
    }

    async addToCart(cid, pid, pqty) {
        try {          
            if (!cid) {
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
                return
            }  else {
                let prod = { "pid": pid, "pqty": pqty }
                let cartFile = await fs.promises.readFile(this.path, "utf-8")
                let newCart = JSON.parse(cartFile)
                const pedido = newCart.find(elemento => elemento.cid === cid);
                if (pedido === undefined) {
                    return ("El pedido no existe")
                } else {
                    const producto = pedido.producto.find(elemento => elemento.pid === pid);
                    if (!producto) {
                        pedido.producto.push({ "pid": pid, "pqty": pqty })
                        await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, 2));
                        return
                    } else {
                        let qty = producto.pqty + pqty
                        producto.pqty = qty
                        await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, 2));
                        return
                    }
                } 
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    /*     async deleteProduct(id) {
            try {
                let productsFile = await fs.promises.readFile(this.path, "utf-8")
                let products = JSON.parse(productsFile);
    
                const idProduct = products.find((p) => p.id === id);
                if (!idProduct) {
                    throw new Error("El producto no existe!")
                }
    
                let productDelete = products.filter((p) => p.id !== id);
    
                await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, 2))
    
                return "Producto eliminado Id: " + id
    
            } catch (e) {
                throw new Error(e)
            }
        } */
}
//Fin del constructor

//Pruebas de funcionamiento

const cart = new CartManager();

const test = async () => {
    console.log(await cart.addToCart(6, 3, 10));
    //console.log(await cart.getCart("1"));
}
//test()

export default CartManager;