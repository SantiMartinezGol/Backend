import { request, response } from "express";
import ProductManager from "../ProductManager.js";
import { Router } from 'express';
import { createServer } from "http"; 
import { socketServer } from "../app.js";

const productList = Router();

const httpServer = createServer();
//const socketServer = new Server(httpServer);

productList.get("/", async (req, res) => {
   try {
      const productos = new ProductManager();
      const productLista = await productos.getProducts()
      res.render('index', { title: "Lista de productos ", productLista });
   } catch (error) {
      res.status(404).send(error);
   }
})

productList.get("/api/realtimeproducts", async (req, res) => {
   socketServer.on('connection', socket => {
      console.log('Nuevo cliente conectado');
   });

   try {

      const productos = new ProductManager();
      const productLista = await productos.getProducts()
      res.render('liveproduct', { title: "Lista de productos Real Time", productLista });

   } catch (error) {
      res.status(404).send(error);
   }
})

export default productList