import dotenv from "dotenv";
dotenv.config();

import MongooseAdapter from "./mongooseAdapter.js";
import FileAdapter from "./fileAdapter.js"

class DbFactory 
{
    static create(dbType = process.env.DB)  
    {
        const dbs = new Map();
        dbs.set('MongooseAdapter', MongooseAdapter);
        dbs.set("FileAdapter", FileAdapter); 

        if(!dbs.has(dbType))
        {
            throw new Error('DbAdapter not found');
        } 
        const db = dbs.get(dbType);
        return new db();
    }
}

export default DbFactory;