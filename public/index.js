import ProductManager from "../src/ProductManager";
import {Server} from "socket.io"
import { socketServer } from "../src/app";


const socket = io()
  socket.emit("connection","Conectado")


/*
const prod = new ProductManager();

const formulario = document.getElementById('Agregar');
formulario.addEventListener('submit', function (event) {
    try
    {
        event.preventDefault();
    
        var title = document.getElementById("title").value;
        var description = document.getElementById("description").value;
        var code = document.getElementById("code").value;
        var price = document.getElementById("price").value;
        var stock = document.getElementById("stock").value;


        if (title == "" || description == "" || code == "" || price == "" || stock == "") {
            alert("Por favor, complete todos los campos del formulario.");
            return 
        }    
        price = parseInt(price)
        stock= parseInt(stock)
        let producto = {
            title,
            description,
            code,
            price,
            stock
        }   
        if (!producto.status) {
            producto.status = true
        }
        const a = await prod.addProduct(producto)
        res.status(a.code).send({ status: a.status, message: a.message })
        }
    }
    catch 
    {
        res.status(a.code).send({ status: a.status, message: a.message })
    }
 }); 


 const formulario1 = document.getElementById('Borrar');
 formulario1.addEventListener('submit', function (event) {
     event.preventDefault();
         var id = document.getElementById("id").value;         
         id = parseInt(id)
         console.log(id);   
    
    const a = await prod.addProduct(producto)
     res.status(a.code).send({ status: a.status, message: a.message })
     } catch {
         res.status(a.code).send({ status: a.status, message: a.message })
     }                    
     
  });

     socket.emit('chatRoom1', textoInput);*/
             
