import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import { __dirname } from './utils.js';
//import handlebars from 'express-handlebars';
//import { Server } from 'socket.io';
//import productList from './routes/productList.js';
import sessionRouter from "./routes/sessionRouter.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import errorHandler from './middlewares/errorHandler.js';

void (async () => {
  await mongoose.connect(process.env.MONGO_DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //app.use("/", productList)
  //app.use("/api/realtimeproducts", productList)
  app.use(cookieParser());
  app.use(session({
      store: mongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        ttl: 10,
      }),
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false
    }));
    initializePassport();
    app.use(passport.initialize());
    app.use(passport.session());

  app.use("/api/products", productRouter)
  app.use("/api/carts", cartRouter)
  app.use("/api/users", userRouter)
  app.use("/api/sessions", sessionRouter)
  app.use(errorHandler);
    
  app.listen(process.env.PORT, () => {
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