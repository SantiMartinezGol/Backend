import express from 'express'
import ProductManager  from '../ProductManager.js';

const app = express()
const productos = new ProductManager();

app.use(express.urlencoded({extended : true}));

app.get ('/products', async(req, res)=>{
    const limit = req.query;
    const products = await productos.getProducts()
    const fiveProducts = products.slice(0, 4)

    res.send(fiveProducts);
});

app.get ('/products', async (req, res)=>{
    const products = await productos.getProducts() ; 
    res.send(products)
}); 

app.get ('/products/:pid', async (req, res)=>{
    const pid = req.params.pid;
    const product = await productos.getProductById(pid); 
    if (!product) {
        res.send({error:"Producto no encontrado"})
    }
 
    res.send (product)
});


app.listen(8083, () => {
console.log('El servidor escucha el puerto 8083');
});