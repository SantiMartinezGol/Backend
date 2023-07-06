import UserManager from "../../domain/managers/userManager.js";
import { createHash } from "../../shared/index.js";


export const list = async (req, res, next) => {
    try {
        const manager = new UserManager();
        const users = await manager.paginate(req.query);

        res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
    }
    catch (e) {
        next(e);
    }
};

export const getOne = async (req, res, next) => {
    try {
        const manager = new UserManager();
        const user = await manager.getOne(req.params);

        res.send({ status: 'success', user });
    }
    catch (e) {next
        next(e);
    };
}

export const save = async (req, res, next) => {
    try {
        
        const dto = {
            ...req.body,
            password: await createHash(req.body.password, 10)
        }
        const manager = new UserManager();
        const user = await manager.create(dto);

        res.status(201).send({ status: 'success', user, message: 'User created.' })
    }
    catch (e) {
        next(e);
    };
};

export const update = async (req, res, next) => {
    try {
        const manager = new UserManager();
        const user = await manager.updateOne(req.params.id, req.body);

        res.send({ status: 'success', user, message: 'User updated.' })
    }
    catch (e) {
        next(e);
    };
}

export const deleteOne = async (req, res, next) => {
    try {
        const manager = new UserManager();
        await manager.deleteOne(req.params);

        res.send({ status: 'success', message: 'User deleted.' })
    }
    catch (e) {
        next(e);
    };
};