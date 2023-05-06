import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import productList from './routes/productList.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8083;

void (async () => {
  await mongoose.connect(process.env.MONGO_DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/products", productRouter)
  app.use("/api/carts", cartRouter)
  app.use("/", productList)
  app.use("/api/realtimeproducts", productList)

  app.listen(PORT, () => {
    console.log('Server listening on port 8083');
  });
})();
/* 
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  (async () => {
    let products =  await prod.getProducts();
    products = products.filter((products) => products.status !== false);
    socket.emit('listProducts', products);
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

  socket.on('activateProduct', (data) => {
    (async () => {
      let product = await prod.getProductById(data) 
      product.status = true;
      await prod.updateProduct(product.id, product)
      let products = await prod.getProducts()
      products = products.filter((products) => products.status !== false);
      socket.emit('listProducts', products);
    })();
  }); 
});  
export {socketServer}
*/