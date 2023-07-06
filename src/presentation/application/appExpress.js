import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";

import { __dirname } from '../../utils.js';
import cartRouter from '../../presentation/routes/cartRouter.js';
import productRouter from '../../presentation/routes/productRouter.js';
import sessionRouter from "../../presentation/routes/sessionRouter.js";
import userRouter from "../../presentation/routes/userRouter.js";
import roleRouter from "../../presentation/routes/roleRouter.js";
import errorHandler from "../../presentation/middlewares/errorHandler.js";

class AppExpress {
  init() {
    this.app = express();
    
    this.app.engine('handlebars', handlebars.engine());

    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'handlebars');
    this.app.use(express.static(__dirname + '/public'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  build() {
    this.app.use("/api/products", productRouter)
    this.app.use("/api/carts", cartRouter)
    this.app.use('/api/sessions', sessionRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/roles', roleRouter);
    this.app.use(errorHandler);
  }
  
  callback()
  {
      return this.app;
  }

  close()
  {
      this.server.close();
  }

  listen() {
    return this.app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  }
}

export default AppExpress;