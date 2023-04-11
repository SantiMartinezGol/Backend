import express from 'express';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';
import {home} from  './routes/productList.js';
import {realTime} from './routes/realTimeProducts.js';

void (async () => {
    try {
        const app = express()
        const PORT = 8083

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/api/products", productRouter)
        app.use("/api/carts", cartRouter)
        app.use("/",home)
        app.use("/api/realtimeproducts",realTime)

        const viewsPath = resolve('views');
       
        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));
        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);

        const httpServer = app.listen(PORT, () => {
            console.log(`El servidor escucha el puerto: ${PORT}`);
        });

      
            
            /* socket.emit('evento_para_socket_individual', 'Este mensaje solo lo debe recibir el socket');

            socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'Este evento lo veran todos los sockets conectados, MENOS el socket actual desde el que se envio el mensaje');

            socketServer.emit('evento_para_todos', 'Este mensaje lo reciben todos los sockets conectados.');

            socket.on('chatRoom1', (data) => {
                console.log(data);

                socket.broadcast.emit('chatRoom1', data);
            }); 
        });*/
    }
    catch (e) {
        console.log("Error: ");
        console.log(e);
    }
})();




