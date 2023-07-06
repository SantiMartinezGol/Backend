import fs from 'fs';
import { generateUniqueKey } from '../../../shared/index.js';
import Role from '../../../domain/entities/role.js'

class RoleFileSystemRepository {
    #role = []
    path = ``;
    
    constructor() {
        this.#role = [];
        this.path = `./src/Roles.json`;
    } 

    async paginate(criteria) {
        
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        const rolesDocument = JSON.parse(roleFile)
        
        const { limit, page } = criteria;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedRoles = rolesDocument.slice(startIndex, endIndex);
    
        const roles = paginatedRoles.map(document => new Role(
            document.id,
            document.name,
            document.permissions
        ));
        const pagination={
            totalDocs: rolesDocument.length,
            limit: limit,
            totalPages: Math.ceil(rolesDocument.length / limit),
            page: page,
            pagingCounter: (page - 1) * limit + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < Math.ceil(rolesDocument.length / limit),
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(rolesDocument.length / limit) ? page + 1 : null
        }

        return {
            roles,
            pagination
        };
    }

    async getOne(id) {
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        const roles = JSON.parse(roleFile)
        const roleDocument = roles.find((r) => r.id === id);
      
       return new Role(
            roleDocument.id,
            roleDocument.name,
            roleDocument.permissions
        ) 
    }

    async create(data) {
        let roleFile = await fs.promises.readFile(this.path, "utf-8");
        let roleDocument = JSON.parse(roleFile);
        const size= 24;
        const id = generateUniqueKey(size);
        
        const newRole = {
            id: id,
            name: data.name,
            permissions: data.permissions
        }
        roleDocument.push(newRole);
        await fs.promises.writeFile(this.path, JSON.stringify(roleDocument, null, 2));
       
        return  new Role(
            newRole.id,
            newRole.name,
            newRole.permissions
        )
    }

    async updateOne(id, data) {         
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        let roleDocument = JSON.parse(roleFile)
        const currentRole = roleDocument.find(r => r.id === id);
        if (!currentRole) 
        {
            throw new Error('Role Not Found!')
        }
        
        currentRole.name = data.name;
        currentRole.permissions = data.permissions;

        await fs.promises.writeFile(this.path, JSON.stringify(roleDocument, null, 2));
         
        return new Role(
            currentRole.id,
            currentRole.name,
            currentRole.permissions
        ) 
    } 

    async deleteOne(id) {
  
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        let roleDocument = JSON.parse(roleFile)
        const currentRoleIndex = roleDocument.findIndex(r => r.id === id);
        if (currentRoleIndex === -1) {
            throw new Error('Role Not Found!');
        }
        
        roleDocument.splice(currentRoleIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(roleDocument, null, 2));
        
        return; 
    }
}        
export default RoleFileSystemRepository;