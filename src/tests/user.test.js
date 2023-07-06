import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";
import { string } from 'zod';

const expect = chai.expect;
let id = ""

describe("Testing user Endpoints Success", () => {
    before(async function () {
        const { app, db } = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
    });
    after(function () {
        this.db.drop();
        /* this.db.close();
        this.requester.app.close(() => {
          console.log('Conexión cerrada');
        }); */
    });
    beforeEach(async function () {
        this.timeout(2000);
        await new Promise(resolve => setTimeout(resolve, 500));
    });

    it('obtener un listado de todos los usuarios /api/users', function ()
    {
        return this.requester
            .get('/api/users/')
            .query({ limit: 5, page: 1 })
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(Array.isArray(result._body.users)).to.be.equals(true);
                expect(_body.status).to.be.equals("success");
            }
        );
    });

    it('Creacion de usuario /api/user', function ()
    {
        this.payload = {
            firstName: `${faker.person.firstName()} ${faker.person.firstName()}`,
            lastName: `${faker.person.lastName()} ${faker.person.lastName()} `,
            email: faker.internet.email(),
            age: 20,
            password: "hola123"
        };
        return this.requester
            .post('/api/users')
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result.request.response;

                expect(status).to.be.equals(201);
                expect(_body.user.firstName).to.be.equals(this.payload.firstName);
                expect(_body.user.email).to.be.equals(this.payload.email);
                id = _body.user.id.toString() 
               }
        );
    });

    it('obtener un usuario por id /api/users/:pid', function ()
    {
        return this.requester
            .get('/api/users/'+`${id}`)
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(typeof _body.user.firstName).to.be.equals('string');
                expect(_body.status).to.be.equals("success");

            }
        );
    });

    it('Modificar un usuario /api/users/:pid', function ()
    {
        this.payload = {
            firstName: `${faker.person.firstName()} ${faker.person.firstName()}`,
            lastName: `${faker.person.lastName()} ${faker.person.lastName()} `,
            email: faker.internet.email(),
            age: 20,
            password: "hola123"
        };

        return this.requester
            .put('/api/users/'+`${id}`)
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.user.firstName).to.be.equals(this.payload.firstName);
                expect(_body.status).to.be.equals("success");
            }
        );
    });
});

// describe("Testing Auth Endpoints Fails", () => {
//     before(async function () {
//         const { app, db } = await initServer();
//         const application = app.callback();
//         this.requester = supertest.agent(application);
//         this.app = app;
//         this.db = db;
//     });
//     after(function () {
//         // this.db.drop();
//         // this.db.close();
//         // this.app.close();
//     });
//     beforeEach(function () {
//         this.timeout(5000);
//     });
//     it('Creacion de cuenta /api/sessions/signup', function ()
//     {
//         const payload = {
//             firstName: 'Ana',
//             lastName: 'Ana',
//             email: faker.internet.email(),
//             age: 20,
//             password: "12345678"
//         };
//
//         return this.requester
//             .post('/api/sessions/signup')
//             .send(payload)
//             .then(result =>
//             {
//                 const { status } = result;
//
//                 expect(status).to.be.equals(400);
//             }
//         );
//     });
//
//     it('Error format email /api/sessions/login', function ()
//     {
//         const payload = {
//             email: 'Invalid email',
//             password: 'incorrect password'
//         };
//
//         return this.requester
//             .post('/api/sessions/login')
//             .send(payload)
//             .then(result =>
//             {
//                 const { _body, status } = result;
//
//                 expect(status).to.be.equals(400);
//                 expect(_body.message[0].message).to.be.equals(payload.email);
//
//                 jwt = _body.accessToken;
//             }
//         );
//     });
//
//     it('User dont exist /api/sessions/login', function ()
//     {
//         const payload = {
//             email: 'martin@gmail.com',
//             password: 'incorrect password'
//         };
//
//         return this.requester
//             .post('/api/sessions/login')
//             .send(payload)
//             .then(result =>
//             {
//                 const { status } = result;
//
//                 expect(status).to.be.equals(404);
//             }
//         );
//     });
// });
