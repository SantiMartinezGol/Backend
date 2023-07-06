import dotenv from "dotenv";
dotenv.config();
import chai from "chai";

import DbFactory from "../data/factories/dbFactory.js";
import CartMongooseRepository from "../data/repositories/mongoose/CartMongooseRepository.js";
import Cart from "../domain/entities/cart.js";

const expect = chai.expect;
const db = DbFactory.create(process.env.DB);
let id = "";

describe("Testing Cart Mongoose Repository", () => {
    
  before(function () {
        db.init(process.env.DB_URI);
        this.CartRepository = new CartMongooseRepository();
    });
    
    after(function () {
        db.drop();
       //db.close();
    }); 

    beforeEach(async function () {

    });

     it('El repositorio debe ser una instancia de CartMongooseRepository', function () {
        expect(this.CartRepository instanceof CartMongooseRepository).to.be.ok;
    });

    it('El repositorio debe poder crear un Cart', function () {
        
        return this.CartRepository
            .create()
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Cart);
                expect(Array.isArray(result.products)).to.be.equals(true);
                id=result.id.toString();
            }
        );
    });

    it('El repositorio debe poder traer un cart', function () {

        return this.CartRepository
            .getOne(id)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Cart);
           
        });
    });
});


