import container from "../../container.js"
import idValidation from "../validations/shared/idValidation.js";

class RoleManager {
    constructor() {
        this.roleRepository = container.resolve("RoleRepository");

    }

    async paginate(criteria) {
        return this.roleRepository.paginate(criteria);
    }

    async getOne(id) {
        await idValidation.parseAsync({id: id});
        return this.roleRepository.getOne(id);
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