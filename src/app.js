import express from 'express'
import ProductManager from './ProductManager.js';
import CartManager from './CartManager.js';

const app = express()
const productos = new ProductManager();
const cart = new CartManager();
const PORT = 8083
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
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

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const pidnumber = parseInt(pid)
    console.log(pidnumber);

    const product = await productos.getProductById(pidnumber);
    if (!product) {
        res.status(200).send({ status: 'Error', message: 'Producto no encontrado' })
    }

    res.send(product)
});

app.post('/products', async (req, res) => {
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

app.put('/products/:id', async (req, res) => {
    const producto = req.body;
    const id = req.params.id;
    const a = await productos.updateProduct(id, producto)
    res.status(a.code).send({ status: a.status, message: a.message })
    //res.status(201).send({status:'Exito', message:'Producto Modificado'})
});

app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    const idNumber = parseInt(id)
    let a = await productos.deleteProduct(idNumber)
    res.status(a.code).send({ status: a.status, message: a.message })
});

//-------------------CART--------------------------
app.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid;
    const number = parseInt(cid);
    const carro = await cart.getCart(number)

    res.status(201).send(carro)
});

app.post('/carts', async (req, res) => {
    await cart.addToCart(null, 0, 0)
    res.status(200).send({ status: 'Exito', message: 'Producto agregado' })
});

app.post('/carts/:cid/products/:pid', async (req, res) => {
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

app.listen(PORT, () => {
    console.log('El servidor escucha el puerto ' + PORT);
});


