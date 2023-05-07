import { error } from 'console';
import fs from 'fs';

class ProductManager {
    #products = []
    path = ``;
    lastId = 1

    constructor() {
        this.#products = [];
        this.path = `./Productos.json`;
    } 

    async getProducts() {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(productsFile)
        } catch (e) {
            await fs.promises.writeFile(this.path, "[]")
            return ("El archivo no contiene producto")
        }
    }

    async addProduct(product) {
        const { title, description, price, code, status, stock, category } = product;
        const productsFile = await fs.promises.readFile(this.path, "utf-8")
        let newProducts = JSON.parse(productsFile)

        const valid = newProducts.find(
            (p) => p.id === product.id || p.code === product.code
        );

        if (valid) {
            let a = { code: 400, message: "ID o CODE repetido", status: "Error" };
            return a
        }

        if (title === undefined || description === undefined || price === undefined || code === undefined || stock === undefined || category === undefined) {
            let a = { code: 400, message: "Todos los campos son requeridos", status: "Error" };
            return a

        } else {
            //Busca el maximo id por si la lista esta desordenada!
            this.lastId = Math.max(...newProducts.map(p => p.id)) + 1;
            newProducts.push({
                id: this.lastId++,
                ...product,
            })
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
            let a = { code: 200, message: "Producto agregado", status: "Exito" };
            return a;
        }
    }

    async getProductById(id) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let idProduct = JSON.parse(productsFile);
            const searchProduct = idProduct.find((p) => p.id === id);
            return searchProduct;
        } catch (e) {
            throw new Error(e)
        }
    }

    async updateProduct(id, product) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(productsFile);
            let idNumber = parseInt(id)
            let idProduct = products.findIndex((p) => p.id === idNumber);
            if (idProduct >= 1) {
                products.splice(idProduct, 1, { id: idNumber, ...product });

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

                let a = { code: 200, message: "Producto modificado", status: "Exito" };
                return a
            } else {
                let a = { code: 400, message: "Producto no encontrado", status: "Error" };
                return a
            }
        } catch (e) {
            throw new Error(e)
            let a = { code: 400, message: "Producto no encontrado", status: "Error" };
            return a
        }
    }

    async deleteProduct(id) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(productsFile);
            let idNumber = parseInt(id)
            const idProduct = products.find((p) => p.id === idNumber);
            if (!idProduct) {
                let a = { code: 400, message: "Producto no encontrado", status: "Error" };
                return a
            }

            let productDelete = products.filter((p) => p.id !== idNumber);
            await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, 2))
            let a = { code: 200, message: " Producto eliminado Id: " + idNumber, status: "Exito" };
            return a
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default ProductManager;