import fs from 'fs';

class RoleFileSystemRepository {
    #role = []
    path = ``;
    
    constructor() {
        this.#role = [];
        this.path = `../../../Roles.json`;
    } 

    async paginate(criteria) {
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        const roleDocuments = JSON.parse(roleFile)
        if (!roleDocuments) 
        {
            throw new Error('Role Not Found!')
        }
        return roleDocuments
    }

    async getOne(id) {
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        const roles = JSON.parse(roleFile)
        const roleDocument = roles.find((r) => r.id === id);
        if (!roleDocument) 
        {
            throw new Error('Role Not Found!')
        }
        return {
            id: roleDocument?.id,
            name: roleDocument?.name,
            permissioms: roleDocument?.permissions
        }
    }

    async create(data) {
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        let roleDocument = JSON.parse(roleFile)
        this.lastId = Math.max(...roleDocument.map(r => r.id)) + 1;
        
        roleDocument.push({
            "id": lastId,
            "name": data.name,
            "permissions": data.permissions
        })
        await fs.promises.writeFile(this.path, JSON.stringify(roleDocument, null, 2));
        return {
            id: roleDocument._id,
            name: roleDocument.name,
            permissions: roleDocument.permissions
        }
    }

    async updateOne(id, data) {         
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        let roleDocument = JSON.parse(roleFile)
        const currentRole = roleDocument.find(el => el.id === id);
        if (!currentRole) 
        {
            throw new Error('Role Not Found!')
        }
        
        currentRole = {id, ...data}
          
        return {
            id: currentRole.id,
            name: currentRole.name,
            permissions: currentRole.permissions
        }
    } 

    async deleteOne(id) {
  
        let roleFile = await fs.promises.readFile(this.path, "utf-8")
        let roleDocument = JSON.parse(roleFile)
        const currentRole = roleDocument.find(el => el.id === id);
        if (!currentRole) 
        {
            throw new Error('Role Not Found!')
        }
            
        currentRole = currentRole.filter(el => el.id !== id) ;
        await fs.promises.writeFile(this.path, JSON.stringify(currentRole, null, 2))
        
        return 
    }
}        
export default RoleFileSystemRepository;