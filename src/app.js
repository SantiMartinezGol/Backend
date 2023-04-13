import express from 'express';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
//import { resolve } from 'path';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import productList from './routes/productList.js';

const app = express();
const PORT = 8083;

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
  // socket.emit('messageHistory', messages);
  //            socket.emit('listProducts', products);
  // socket.on('message', (data) => {
  //   let message = { socketId: socket.id, message: data };
  //   messages.push(message);
  //   socketServer.emit('messageHistory', messages);
  // });

  socket.on('addProduct', (data) => {
    products.push(data);
    socket.emit('listProducts', products);
  });
  socket.on('deleteProduct', (data) => {
    products = products.filter((products) => products.name !== data.name);

    socket.emit('listProducts', products);
  });
});
export { socketServer };  





