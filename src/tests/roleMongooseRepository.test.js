import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";
import RoleMongooseRepository from "../data/repositories/mongoose/roleMongooseRepository.js";
import Role from "../domain/entities/role.js";
const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

let id = "";

describe("Testing Role Mongoose Repository", () => {
    
  before(function () {
        db.init(process.env.DB_URI);
        this.roleRepository = new RoleMongooseRepository();
    });
    
    after(function () {
        db.drop();
       //db.close();
    }); 

    beforeEach(async function () {

    });

    it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    });
    it('El repositorio debe devolver un arreglo', function () {
        return this.roleRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
               
            { 
                expect(Array.isArray(result.roles)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }     
        )
   
    });
    it('El repositorio debe poder crear un Rol', function () {
        const role = {
            name: faker.person.jobArea(),
            permissions: [
                faker.person.jobDescriptor()
                ]
        };

        return this.roleRepository
            .create(role)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Role);
                expect(result.name).to.be.equals(role.name);
                id = result.id.toString()
            }
        );
    });

    it('El repositorio debe poder traer un rol', function () {

        return this.roleRepository
            .getOne(id)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Role);     
        });
    });

      it('El repositorio debe poder modificar un Rol', function () {
        const role = {
            name: faker.person.jobArea(),
            permissions: [
                faker.person.jobDescriptor()
                ]
        };

        return this.roleRepository
            .updateOne(id, role)
            .then(result =>
            {
                expect(result).to.be.an.instanceof(Role);
                expect(result.name).to.be.equals(role.name);
                expect(Array.isArray(result.permissions)).to.be.equals(true);
            }
        );
    });
});


