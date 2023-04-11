import { Router } from 'express';
import CartManager from '../../public/CartManager.js';
import ProductManager from '../../public/ProductManager.js';

const carro = [];
const cartRouter = Router();
const cart = new CartManager();
const productos = new ProductManager()

cartRouter.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const number = parseInt(cid);
    const carro = await cart.getCart(number)

    res.status(201).send(carro)
});

cartRouter.post('/', async (req, res) => {
    await cart.addToCart(null, 0, 0)
    res.status(200).send({ status: 'Exito', message: 'Carro creado' })
});


cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const pedido = parseInt(cid);
    const articulo = parseInt(pid);
    const searchProduct = await productos.getProductById(articulo)
    if (searchProduct) {
        await cart.addToCart(pedido, articulo, 1)
        res.status(200).send({ status: 'Exito', message: 'Producto agregado' })
    } else {
        res.status(400).send({ status: 'Error', message: 'Producto inexistente' })
    }
});


export default cartRouter;