import { request, response } from "express";
import ProductManager from "../../public/ProductManager.js";

export const productList = async (req,res)=>{
    try{
    const productos = new ProductManager();
    const productList =await productos.getProducts()
    res.render('index',{title:"Lista de productos ", productList});
 } catch (error) {
    res.status(404).send(error);
 }
}

export default productList