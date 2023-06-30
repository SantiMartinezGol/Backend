import fs from 'fs';
import { generateUniqueKey } from '../../../shared/index.js';

class UserFileSystemRepository {
    #users = []
    path = ``;

    constructor() {
        this.#users = [];
        this.path = `./src/Users.json`;
    }

    async paginate(criteria) {
     
        const {limit, page}  = criteria  
        
        let usersFile = await fs.promises.readFile(this.path, 'utf-8')
        let users = JSON.parse(usersFile);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedUsers = users.slice(startIndex, endIndex);

        return {
            docs: paginatedUsers.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                isAdmin: user.isAdmin,
                role: user.role,
                cart: user.cart
            })),
            totalDocs: users.length,
            limit: limit,
            totalPages: Math.ceil(users.length / limit),
            page: page,
            pagingCounter: (page - 1) * limit + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(users.length / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(users.length / limit) ? page + 1 : null
        };
    }


    async getOne(id) {
        
        const usersFile = await fs.promises.readFile(this.path, 'utf-8')         
        let users = JSON.parse(usersFile)
        let user = users.find((u) => u.id === id);
        if (!user) {
        throw new Error('User Not Found!');
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age,
            isAdmin: user.isAdmin,
            role: user.role,
            cart: user.cart
        }
    }


    async getOneByEmail(email) {
    const usersFile = await fs.promises.readFile(this.path, 'utf-8')
    let users = JSON.parse(usersFile)

    let user = users.find((u) => u.email === email);
    if (!user) {
        throw new Error('User Not Found!');
    }
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        isAdmin: user.isAdmin,
        role: user.role,
        cart: user.cart
    }
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

    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        isAdmin: data.isAdmin,
        role: data.role
    }
}

    async updateOne(id, data) {

    let usersFile = await fs.promises.readFile(this.path, 'utf-8')
    let users = JSON.parse(usersFile);
    let idUser = users.findIndex((u) => u.id === id);
    if (!idUser) {
        throw new Error('User Not Found!');
    }
    users.splice(idUser, 1, { id: id, ...data });
    await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2))

    return {
        id: id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: data.age,
        isAdmin: data.isAdmin,
        role: data.role
    }

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