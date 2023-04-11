import { Router } from 'express';
import ProductManager from '../../public/ProductManager.js';

const product = [];
const productRouter = Router();
const productos = new ProductManager();

productRouter.get('/', async (req, res) => {
    const limit = req.query;
    const number = parseInt(limit.limit);
    const products = await productos.getProducts()

    if (isNaN(number)) {
        res.send(products)
    } else {
        const filterProducts = products.slice(0, number)
        res.send(filterProducts);
    }
});

productRouter.get('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const pidnumber = parseInt(pid)

    const product = await productos.getProductById(pidnumber);
    if (!product) {
        res.status(200).send({ status: 'Error', message: 'Producto no encontrado' })
    }

    res.send(product)
});

productRouter.post('/', async (req, res) => {
    const producto = req.body;

    if (!producto.status) {
        producto.status = true
    }
    try {
        const a = await productos.addProduct(producto)
        res.status(a.code).send({ status: a.status, message: a.message })

    }
    catch (e) {
        res.status(400).send({ status: 'Error', message: 'Producto no agregado' })
    }

});

productRouter.put('/:id', async (req, res) => {
    const producto = req.body;
    const id = req.params.id;
    const a = await productos.updateProduct(id, producto)
    res.status(a.code).send({ status: a.status, message: a.message })
    //res.status(201).send({status:'Exito', message:'Producto Modificado'})
});

productRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const idNumber = parseInt(id)
    let a = await productos.deleteProduct(idNumber)
    res.status(a.code).send({ status: a.status, message: a.message })
});

export default productRouter;