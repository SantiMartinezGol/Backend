import { request, response } from "express";
import ProductManager from "../../public/ProductManager.js";
import { Server } from 'socket.io';

export const realTime = async (req, res) => {
   try {
      const productos = new ProductManager();
      const productList = await productos.getProducts()
      res.render('liveproduct', { title: "Lista de productos Real Time", productList });

      const httpServer = app.listen(PORT, () => {
         console.log(`El servidor escucha el puerto: ${PORT}`);
     });

      const socketServer = new Server(httpServer); ///// socket

      socketServer.on('connection', socket => {
         console.log('Nuevo cliente conectado');
      });
      socket.on('message', (data) => {
         console.log(data);
      });

   } catch (error) {
      res.status(404).send(error);
   }
}




