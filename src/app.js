import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import productList from './routes/productList.js';
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 8085; 

const prod = new ProductManager();

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/",productList)
app.use("/api/realtimeproducts",productList)

const httpServer = app.listen(PORT, () => {
    console.log(`El servidor escucha el puerto: ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  (async () => {
    let products =  await prod.getProducts();
    products = products.filter((products) => products.status !== false);
    //console.log(products); 
    socket.emit('listProducts', products);
   /*    } catch {
      console.log("Error de conexion")
    }*/
  })(); 
  
    socket.on('addProduct', (data) => {
    (async () => {
    await prod.addProduct(data)
    let products = await prod.getProducts()
    products = products.filter((products) => products.status !== false);

    socket.emit('listProducts', products);
    })();
  });

  socket.on('deleteProduct', (data) => {
    (async () => {
    let product = await prod.getProductById(data) 
    product.status = false;
    await prod.updateProduct(product.id, product)
    let products = await prod.getProducts()
    products = products.filter((products) => products.status !== false);
   
    socket.emit('listProducts', products);
    })();
  }); 

}); 
export {socketServer}
