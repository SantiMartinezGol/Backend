import container from "../../container.js"
import idValidation from "../validations/shared/idValidation.js";
import paginateValidation from "../validations/shared/paginateValidation.js";

class RoleManager {
    constructor() {
        this.roleRepository = container.resolve("RoleRepository");

    }

    async paginate(criteria) {
        var { limit, page } = criteria;
        limit = parseInt(limit);
        page = parseInt(page);     
        const data = { limit, page};
        await paginateValidation.parseAsync(data);

        const rolesDocument= this.roleRepository.paginate(criteria);
        if (!rolesDocument) 
        {
            throw new Error('Roles Not Found!')
        }
        return rolesDocument
    }

    async getOne(id) {
        await idValidation.parseAsync({id: id});
        const roleDocument = this.roleRepository.getOne(id);
        if (!roleDocument) 
        {
            throw new Error('Role Not Found!')
        }
        return roleDocument
    }

    async create(data) {
        return await this.roleRepository.create(data);
    }

    async updateOne(id, data) {
        await idValidation.parseAsync({id: id});

        return this.roleRepository.updateOne(id, data);
    }

    async deleteOne(id) {
        await idValidation.parseAsync({id: id});

        return this.roleRepository.deleteOne(id);
    }
}

export default RoleManager;