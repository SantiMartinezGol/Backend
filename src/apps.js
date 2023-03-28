import express from 'express'
import ProductManager  from '../ProductManager.js';

const app = express()
const productManager = new ProductManager();


app.use(express.urlencoded({extended : true}));

app.get ('/products', async (req, res)=>{
 /*    const products =  ; */
    res.send(await productManager.getProducts())
});

/* app.get ('/', (req, res)=>{

    const products = req.query.products

    res.send (products)
});


app.get ('/products', (req, res)=>{
    res.send ('10Productos')
});

app.get ('/products', (req, res)=>{
    res.send ('10Productos')
});
 */
app.listen(8086, () => {
console.log('El servidor escucha el puerto 8081');
});