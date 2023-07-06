import idValidation from "../../domain/validations/shared/idValidation.js"
import paginateValidation from "../validations/shared/paginateValidation.js"
import userCreateValidation from "../../domain/validations/user/userCreateValidation.js"
import loginValidation from "../../domain/validations/session/loginValidation.js"
import userUpdateValidation from "../../domain/validations/user/userUpdateValidation.js"
import container from "../../container.js"

class UserManager {
    constructor() {
        this.userRepository = container.resolve("UserRepository") ;
    }

    async paginate(data) {
        var { limit, page } = data;
        limit = parseInt(limit);
        page = parseInt(page);
        data = {limit,page};
        await paginateValidation.parseAsync(data);

        return this.userRepository.paginate(data);
    }

    async getOneByEmail(email) {
        await loginValidation.parseAsync(email);
        const userDocument = await this.userRepository.getOneByEmail(email);
        if(!userDocument){
            throw new Error("User Not Found");
        }
        return userDocument
    }

    async getOne(data) { 

        await idValidation.parseAsync(data);
        const {id} = data;
        const userDocument = await this.userRepository.getOne(id);
        if(!userDocument)
        {
          throw new Error('User dont exist.');
        }
        return userDocument
    }

    async create(data) {
        await userCreateValidation.parseAsync(data);
        const user = await this.userRepository.create(data);
        if(!user){
            throw new Error ("Unexpected error, no user created")
        }
        return { ...user, password: undefined };
    }

    async updateOne(id, data) {
        const userDocument = await this.userRepository.updateOne(id, data);
        if(!userDocument)
        {
        throw new Error('User dont exist.');
        }

        return userDocument;
    }

    async deleteOne(data) { 
        await idValidation.parseAsync(data)
        const { id } = data;
         return this.userRepository.deleteOne(id);
         }

    async forgetPassword(dto) {
        const user = await this.userRepository.getOneByEmail(dto.email);
        user.password = dto.password;

        return this.userRepository.updateOne(user.id, user);
    }
}

export default UserManager;