import RoleManager from "../../domain/managers/roleManager.js";


export const list = async (req, res, next) => {
    try {
        const manager = new RoleManager();
        const roles = await manager.paginate(req.query);

        res.send({ status: 'success', roles: roles.docs, ...roles, docs: undefined });
    }
    catch (e) 
    {
        next(e);
    }
};

export const getOne = async (req, res, next) => {
    try {   
        const manager = new RoleManager();
        const role = await manager.getOne(req.params.id);

        res.send({ status: 'success', role });
    }
    catch (e) {
        next(e);
    }
};

export const save = async (req, res, next) => {
    try {
        console.log(req.body);
        const manager = new RoleManager();
        const role = await manager.create(req.body);

        res.send({ status: 'success', role, message: 'Role created.' });
    }
    catch (e) {
        next(e);
    }
};

export const update = async (req, res, next) => {
    try {
        const manager = new RoleManager();
        const role = await manager.updateOne(req.params.id, req.body);

        res.send({ status: 'success', role, message: 'Role updated.' });
    }
    catch (e) {
        next(e);
    }
};

export const deleteOne = async (req, res, next) => {
    try {
        const manager = new RoleManager();
        await manager.deleteOne(req.params.id);

        res.send({ status: 'success', message: 'Role deleted.' });
    }
    catch (e) {
        next(e);
    }
};