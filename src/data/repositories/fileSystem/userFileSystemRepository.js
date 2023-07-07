import fs from 'fs';
import { generateUniqueKey } from '../../../shared/index.js';
import User from '../../../domain/entities/user.js';

class UserFileSystemRepository {
    #users = []
    path = ``;

    constructor() {
        this.#users = [];
        this.path = `./src/Users.json`;
    }

    async paginate(criteria) {
        let usersFile = await fs.promises.readFile(this.path, 'utf-8')
        const usersDocument = JSON.parse(usersFile);

        const {limit, page}  = criteria
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = usersDocument.slice(startIndex, endIndex);

        const users = paginatedUsers.map(document => new User({
            id: document.id,      
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            isAdmin: document.isAdmin,
            role: document.role,
            cart: document.cart
        }));

        const pagination={
            totalDocs: usersDocument.length,
            limit: limit,
            totalPages: Math.ceil(usersDocument.length / limit),
            page: page,
            pagingCounter: (page - 1) * limit + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(usersDocument.length / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(usersDocument.length / limit) ? page + 1 : null
        }
   
        return {
            users,
            pagination
        };
    }


    async getOne(id) {
        
        const usersFile = await fs.promises.readFile(this.path, 'utf-8')         
        let users = JSON.parse(usersFile)
        let user = users.find((u) => u.id === id);
        
        return new User ({
            id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            age: user?.age,
            isAdmin: user?.isAdmin,
            role: user?.role
        });
    }

    async getOneByEmail(email) {

        const usersFile = await fs.promises.readFile(this.path, 'utf-8')
        let users = JSON.parse(usersFile)
        let user = users.find((u) => u.email === email);
        
        return new User ({
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            age: user?.age,
            isAdmin: user?.isAdmin,
            password: user?.password,
            role: user?.role
        })
    }

    async create(data) {
        const { firstName, lastName, email, age, password, isAdmin, role } = data;
        const usersFile = await fs.promises.readFile(this.path, 'utf-8')
        let users = JSON.parse(usersFile)
        
        const size= 24
        const id = generateUniqueKey(size);

        const valid = users.find((u) => u.id === id);
        if (valid) 
        {
            throw new Error ('Invalid Id')
        }
        if (firstName === undefined || lastName === undefined || email === undefined || age === undefined || password === undefined)
        {
            throw new Error('All fields required')
        }
        if (!data.isAdmin)
        {
            data.isAdmin = false
        }

    users.push({
        id: id,
        ...data,
    })
    await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))

    return new User ({
        id: id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        age: data?.age,
        isAdmin: data?.isAdmin,
        role: data?.role
    })
}

    async updateOne(id, data) {

        let usersFile = await fs.promises.readFile(this.path, 'utf-8');
        let users = JSON.parse(usersFile);
        let userIndex = users.findIndex((u) => u.id === id);
        if (userIndex === -1) {
            throw new Error('User Not Found!');
        }
        users[userIndex] = new User({ ...users[userIndex], ...data });
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
        
        return new User ({
            id: users[userIndex].id,
            firstName: users[userIndex]?.firstName,
            lastName: users[userIndex]?.lastName,
            email: users[userIndex]?.email,
            age: users[userIndex]?.age,
            isAdmin: users[userIndex]?.isAdmin,
            role: users[userIndex]?.role
        })
        
            }

    async deleteOne(id) {
        let usersFile = await fs.promises.readFile(this.path, 'utf-8')
        let users = JSON.parse(usersFile);

        const idUser = users.find((u) => u.id === id);
        if (!idUser) {
            throw new Error('User Not Found!');
        }
        let userDelete = users.filter((u) => u.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(userDelete, null, 2))
        return
    }
}

export default UserFileSystemRepository;