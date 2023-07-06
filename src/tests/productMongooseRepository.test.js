import dotenv from "dotenv";
dotenv.config();

import { faker, fakerEL } from '@faker-js/faker';
import chai from "chai";
import DbFactory from "../data/factories/dbFactory.js";
import ProductMongooseRepository from "../data/repositories/mongoose/productMongooseRepository.js";
import Product from "../domain/entities/product.js";

const expect = chai.expect;
const db = DbFactory.create(process.env.DB);

let id = "";

describe("Testing Product Mongoose Repository", () => {
    
  before(function () {
        db.init(process.env.DB_URI);
        this.productRepository = new ProductMongooseRepository();
    });
    
    after(function () {
        db.drop();
       // db.close();
    }); 

    beforeEach(async function () {

    });

    it('El repositorio debe ser una instancia de ProductMongooseRepository', function () {
        expect(this.productRepository instanceof ProductMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.productRepository
            .find(5, 1)
            .then(result =>
            { 
                expect(Array.isArray(result.products)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }     
        )
   
    });
    it('El repositorio debe poder crear un producto', function () {
        const product = {
            title: faker.commerce.product(),
            description: faker.commerce.productAdjective(),
            code: faker.finance.bitcoinAddress(),
            price: parseInt(faker.commerce.price()) ,
            stock: parseInt(faker.commerce.price({ min: 1, max: 100 })),
            category: faker.commerce.department()
        };

        return this.productRepository
            .create(product)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Product);
                expect(result.title).to.be.equals(product.title);
                expect(result.price).to.be.equals(product.price);
                id = result.id.toString()
            }
        );
    });

    it('El repositorio debe poder traer un producto por id', function () {

        return this.productRepository
            .getOne(id)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Product);
                expect(typeof result.title ).to.be.equals('string');
                expect(typeof result.code ).to.be.equals('string');
                expect(typeof result).to.be.equals('object');
                expect(typeof result.price ).to.be.equals('number');
               }
        );
    });

    it('El repositorio debe poder modificar un Product', function () {
        const product = {
            title: faker.commerce.product(),
            description: faker.commerce.productAdjective(),
            code: faker.finance.bitcoinAddress(),
            price: parseInt(faker.commerce.price()) ,
            stock: parseInt(faker.commerce.price({ min: 1, max: 100 })),
            category: faker.commerce.department()
        };

        return this.productRepository
            .updateOne(id, product)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Product);
                expect(result.title).to.be.equals(product.title);
                expect(result.code).to.be.equals(product.code);
            }
        );
    });
});

