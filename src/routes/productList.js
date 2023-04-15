import { request, response } from "express";
import ProductManager from "../ProductManager.js";
import { Router } from 'express';
import{ socketServer } from "../app.js";

const productList = Router();
const prod = new ProductManager();

productList.get("/", async (req, res) => {
   try {
      let products = await prod.getProducts()
      products = products.filter((products) => products.status !== false);
     
   } catch (error) {
      res.status(404).send(error);
   }
})

productList.get("/api/realtimeproducts", async (req, res) => {

   try{

   let products = await prod.getProducts()
   products = products.filter((products) => products.status !== false);
   //console.log(products);  /////ok
   res.render('liveproduct', { title: "Lista de productos ", products });
   } catch (error) {
      res.status(404).send(error);
   } 
    
   socketServer.on('connection', socket => {
      
    //console.log('Nuevo cliente conectado')
    (async () => {
      let products = await prod.getProducts()
      products = products.filter((products) => products.status !== false);
      socket.emit('listProducts', products)
   })()

   }); 
});

export default productList