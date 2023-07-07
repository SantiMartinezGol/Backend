import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import chai from "chai";

import DbFactory from "../data/factories/dbFactory.js";
import UserMongooseRepository from "../data/repositories/mongoose/userMongooseRepository.js";
import User from "../domain/entities/user.js";

const expect = chai.expect;
const db = DbFactory.create(process.env.DB);

let id = "";
let email = "";

describe("Testing User Mongoose Repository", () => {
    
  before(function () {
        db.init(process.env.DB_URI);
        this.userRepository = new UserMongooseRepository();
    });
    
    after(function () {
        db.drop();
        db.close();
    }); 

    beforeEach(async function () {

    });

    it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            { 
                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }     
        )
   
    });
    it('El repositorio debe poder crear un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            password: "hola123"
        };

        return this.userRepository
            .create(user)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(User);
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
                id = result.id.toString()
            }
        );
    });

    it('El repositorio debe poder traer un usuario por id', function () {

        return this.userRepository
            .getOne(id)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(User);
                expect(typeof result.firstName ).to.be.equals('string');
                expect(typeof result.lastName ).to.be.equals('string');
                expect(typeof result).to.be.equals('object');
                expect(typeof result.age ).to.be.equals('number');
                email = result.email            }
        );
    });

    it('El repositorio debe poder traer un usuario por email', function () {

        return this.userRepository
            .getOneByEmail(email)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(User);
                expect(typeof result.firstName ).to.be.equals('string');
                expect(typeof result.lastName ).to.be.equals('string');
                expect(typeof result).to.be.equals('object');
                expect(typeof result.age ).to.be.equals('number');
            }
        );
    });

    it('El repositorio debe poder modificar un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 26,
            isAdmin: false,
            password: "hola123"
        };

        return this.userRepository
            .updateOne(id, user)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(User);
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
            }
        );
    });
});

