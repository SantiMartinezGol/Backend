import { faker } from '@faker-js/faker';
import chai from "chai";
import supertest from "supertest";
import initServer from "./index.js";
import { jwt } from './auth.test.js';

const expect = chai.expect;
let id = ""

describe("Testing Product Endpoints Success", () => {
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

    it('obtener un listado de todos los productos /api/products', function ()
    {
        return this.requester
            .get('/api/products/')
            .query([5, 1] )
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(Array.isArray(result._body.products)).to.be.equals(true);
                expect(_body.status).to.be.equals("success");
            }
        );
    });

    it('Creacion de producto /api/product', function ()
    {
        this.payload = {
            title: faker.commerce.product(),
            description: faker.commerce.productAdjective(),
            code: faker.finance.bitcoinAddress(),
            price: parseInt(faker.commerce.price()) ,
            stock: parseInt(faker.commerce.price({ min: 1, max: 100 })),
            category: faker.commerce.department()
        };

        return this.requester
            .post('/api/products')
            .set('Authorization', `Bearer ${jwt}`)
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result.request.response;

                expect(status).to.be.equals(201);
                expect(_body.product.title).to.be.equals(this.payload.title);
                expect(_body.product.price).to.be.equals(this.payload.price);
                id = _body.product.id.toString() 
               }
        );
    });

    it('obtener un producto /api/products/:pid', function ()
    {
        return this.requester
            .get('/api/products/'+`${id}`)
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(typeof _body.product.title).to.be.equals('string');
                expect(_body.status).to.be.equals("success");
            }
        );
    });

    it('Modificar un producto /api/products/:pid', function ()
    {
        this.payload = {
            title: faker.commerce.product(),
            description: faker.commerce.productAdjective(),
            code: faker.finance.bitcoinAddress(),
            price: parseInt(faker.commerce.price()) ,
            stock: parseInt(faker.commerce.price({ min: 1, max: 100 })),
            category: faker.commerce.department()
        };

        return this.requester
            .put('/api/products/'+`${id}`)
            .set('Authorization', `Bearer ${jwt}`)
            .send(this.payload)
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.product.title).to.be.equals(this.payload.title);
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
