import dotenv from "dotenv";
dotenv.config();

import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";

void (async() =>
{
  if(process.env.DB!=="FileAdapter")
  {
    const db = DbFactory.create(process.env.DB);
    db.init(process.env.DB_URI);
  }
  else 
  {
    const db = DbFactory.create(process.env.DB);
  }
  const app = AppFactory.create();

  app.init();
  app.build();
  app.listen();
})();
