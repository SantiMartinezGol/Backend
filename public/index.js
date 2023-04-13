import ProductManager from "../src/ProductManager";
<<<<<<< HEAD
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
    
=======

const prod = new ProductManager();

/*const formulario = document.getElementById('Agregar');
formulario.addEventListener('submit', function (event) {
    event.preventDefault();*/

const agregar = ()=>{
>>>>>>> 3a0afde7095e0a299006e6bc44037a6f2caebdde
        var title = document.getElementById("title").value;
        var description = document.getElementById("description").value;
        var code = document.getElementById("code").value;
        var price = document.getElementById("price").value;
        var stock = document.getElementById("stock").value;

<<<<<<< HEAD

=======
>>>>>>> 3a0afde7095e0a299006e6bc44037a6f2caebdde
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
<<<<<<< HEAD
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
=======
    if (!producto.status) {
        producto.status = true
    }
  /*   const a = await prod.addProduct(producto)
    res.status(a.code).send({ status: a.status, message: a.message })



    } catch {

        res.status(a.code).send({ status: a.status, message: a.message })
    }
 }); */
}

 const formulario1 = document.getElementById('Borrar');
 formulario.addEventListener('submit', function (event) {
>>>>>>> 3a0afde7095e0a299006e6bc44037a6f2caebdde
     event.preventDefault();
         var id = document.getElementById("id").value;         
         id = parseInt(id)
         console.log(id);   
    
<<<<<<< HEAD
    const a = await prod.addProduct(producto)
     res.status(a.code).send({ status: a.status, message: a.message })
     } catch {
         res.status(a.code).send({ status: a.status, message: a.message })
     }                    
     
  });

     socket.emit('chatRoom1', textoInput);*/
=======
   /*   const a = await prod.addProduct(producto)
     res.status(a.code).send({ status: a.status, message: a.message })
     } catch {
         res.status(a.code).send({ status: a.status, message: a.message })
     } */                    
     
  });

            // socket.emit('chatRoom1', textoInput);
>>>>>>> 3a0afde7095e0a299006e6bc44037a6f2caebdde
             
