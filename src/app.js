import express from 'express';
import cartRouter from './routes/cartRouter.js';
import productRouter from './routes/productRouter.js';

const app = express()
const PORT = 8083

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(PORT, () => {
    console.log('El servidor escucha el puerto ' + PORT);
});


