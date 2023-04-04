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
        try {
            const { title, description, price, image, code, stock } = product;

            const productsFile = await fs.promises.readFile(this.path, "utf-8")

            let newProducts = JSON.parse(productsFile)

            const valid = newProducts.find(
                (p) => p.id === product.id || p.code === product.code
            );

            if (valid) {
                throw new Error("ID o CODE repetido");
            }

            if (title === undefined || description === undefined || price === undefined || image === undefined || code === undefined || stock === undefined) {

                throw new Error("Todos los campos son requeridos");

            } else {
                //Busca el maximo id por si la lista esta desordenada!
                this.lastId = Math.max(...newProducts.map(p => p.id)) + 1;
                newProducts.push({
                    id: this.lastId++,
                    ...product,
                })
            }

            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
            return "Producto agregado";
        } catch (e) {
            throw new Error(e)
        }
    }

    async getProductById(id) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let idProduct = JSON.parse(productsFile);

            const searchProduct = idProduct.find((p) => p.id === id);
           /*  if (!searchProduct) {
                throw new Error("NotFound");
            }   */
            return searchProduct;
        } catch (e) {
            throw new Error(e)
        }
    }

    async updateProduct(id, product) {
        try {
            let productsFile = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(productsFile);

            let idProduct = products.findIndex((p) => p.id === id);

            products.splice(idProduct, 1, { id, ...product });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

            return "Producto modificado!"

        } catch (e) {
            throw new Error(e)
        }

    }

    async deleteProduct(id) {
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
    }
}

//Fin del constructor


//Pruebas de funcionamiento

const newProduct1 = {
    title: "Producto1",
    description: "Prueba",
    price: 10,
    image: "sin img",
    code: "234jkjhajghjsdd",
    stock: 20,
};

const productos = new ProductManager();

const test = async () => {

    console.log(await productos.addProduct({ ...newProduct1 }));
    console.log(await productos.getProducts);
}

//test()

const main = async () => {
    //Devuelve los productos almacenados en Productos.json
    //console.log("Lista Productos: ", await productos.getProducts());

    //Devuelve el producto con el id especificado, en este caso el 4
    //console.log("Producto Encontrado: ", await productos.getProductById(4));

    // Modifica un producto sin cambiar su Id, devuelve la lista de productos actualizada
    // console.log(await productos.updateProduct(1, { ...newProduct1, code: "MODIFICADO" }));
    // console.log("Lista Productos: ", await productos.getProducts());

    // Elimina un producto y devuelve la lista de productos actualizada
    //console.log(await productos.deleteProduct(1));
    //console.log("Lista Productos ", await productos.getProducts());
};

//main();

export default ProductManager;