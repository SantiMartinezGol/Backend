import Role from "../../../domain/entities/role.js";
import roleSchema from "../../models/mongoose/roleSchema.js";

class RoleMongooseRepository {

    async paginate(criteria) {
        const { limit, page } = criteria;
        const rolesDocument = await roleSchema.paginate({}, { limit, page });
        const { docs, ...pagination } = rolesDocument;

        const roles = docs.map(document => new Role(
            document._id,
            document.name,
            document.permissions
        ));

        return {
            roles,
            pagination
        };
    }

    async getOne(id) {
        const roleDocument = await roleSchema.findOne({ _id: id });

        return new Role(
            roleDocument._id,
            roleDocument.name,
            roleDocument.permissions
        )
    }

    async create(data) {
        const roleDocument = await roleSchema.create(data);
        
        return new Role(
            roleDocument._id,
            roleDocument.name,
            roleDocument.permissions
        )
    }

    async updateOne(id, data) {
        const roleDocument = await roleSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!roleDocument) {
            throw new Error('Role Not Found!');
        }

        return new Role(
            roleDocument._id,
            roleDocument.name,
            roleDocument.permissions
        )
    }

    async deleteOne(id) {
        return roleSchema.deleteOne({ _id: id });
    }
}

export default RoleMongooseRepository;