import fs from 'fs';
import { generateUniqueKey } from "../../../shared/index.js";

class ProductFileSystemRepository {
    #products = []
    path = ``;
    lastId = 1

    constructor() {
        this.#products = [];
        this.path = `./src/Products.json`;
    } 

    async find(limit, page) {
       
        let productsFile = await fs.promises.readFile(this.path, 'utf-8');
        let products = JSON.parse(productsFile); 
     
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
    
        const paginatedProducts = products.slice(startIndex, endIndex);

        return {
            docs: paginatedProducts.map(product => ({
                id: product.id, 
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                stock: product.stock,
                category: product.category,
                status: product.status,
            })),
            totalDocs: products.length,
            limit: limit,
            totalPages: Math.ceil(products.length / limit),
            page: page,
            pagingCounter: (page - 1) * limit + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(products.length / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(products.length / limit) ? page + 1 : null
        };
    }
    
    async getOne(id) {
        
        const productsFile = await fs.promises.readFile(this.path, 'utf-8')
                    
        let products = JSON.parse(productsFile)
        let product = products.find((p) => p.id === id);
        if (!product) {
        throw new Error('Product Not Found!');
        }
        return {
        id: product.id,
        title: product.title,
        description: product.description,
        code: product.code,
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status
        }
    }

    async create(data) {
           
        const { title, description, price, code, status, stock, category } = data;
        const productsFile = await fs.promises.readFile(this.path, 'utf-8')
       
        let newProducts = JSON.parse(productsFile)
        const size= 24
        const id = generateUniqueKey(size);
        const valid = newProducts.find((p) => p.id === id || p.code === data.code);

        if (valid) 
        {
            throw new Error ('ID o CODE repetido')
        }

        if (title === undefined || description === undefined || price === undefined || code === undefined || stock === undefined || category === undefined) 
        {
            throw new Error ('All fields required')
        } 

        if (!data.status)
        {
            data.status = true
        }
     
        newProducts.push({
            id: id,
            ...data
        })
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
        
        return {
            id: id,
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category,
            status: data.status
        }
    }

    async updateOne(id, product) {
       
        let productsFile = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(productsFile);
        let idProduct = products.findIndex((p) => p.id === id);
        if (!idProduct)
        {
            throw new Error('Product Not Found!');    
        }  
        if (!product.status)
        {
            product.status = true
        }  
        products.splice(idProduct, 1, { id: id, ...product });
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

        return {
            id: id,
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            stock: product.stock,
            category: product.category,
            status: product.status
        }    

    }

    async deleteOne(id) {
        let productsFile = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(productsFile);
       
        const idProduct = products.find((p) => p.id === id);
        if (!idProduct) 
        {
            throw new Error('Product Not Found!');
        }
        let productDelete = products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productDelete, null, 2))
        return 
    }
}

export default ProductFileSystemRepository;