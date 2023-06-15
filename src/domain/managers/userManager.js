import UserMongooseDao from "../../data/daos/userMongooseDao.js"
import idValidation from "../../domain/validations/shared/idValidation.js"
import paginateValidation from "../validations/shared/paginateValidation.js"
import userCreateValidation from "../../domain/validations/user/userCreateValidation.js"
import loginValidation from "../../domain/validations/session/loginValidation.js"
import userUpdateValidation from "../../domain/validations/user/userUpdateValidation.js"
class UserManager {
    constructor() {
        this.userDao = new UserMongooseDao();
    }

    async paginate(data) {
        var { limit, page } = data;
        limit = parseInt(limit)
        page = parseInt(page)
        data = {limit,page}

        await paginateValidation.parseAsync(data);
        return this.userDao.paginate(data);
    }

    async getOneByEmail(email) {
        await loginValidation.parseAsync(email);
        return this.userDao.getOneByEmail(email);
    }

    async getOne(data) {
       
        await idValidation.parseAsync(data);
        const {id} = data
        return this.userDao.getOne(id);
    }

    async create(data) {
        await userCreateValidation.parseAsync(data);
        const user = await this.userDao.create(data);
        if(!user){
            throw new Error ("Unexpected error, no user created")
        }
        return { ...user, password: undefined };
    }

    async updateOne(id, data) {
        await userUpdateValidation.parseAsync({...data, id});
        return this.userDao.updateOne(id, data);
    }

    async deleteOne(data) {
        await idValidation.parseAsync(data)
        const { id } = data;
         return this.userDao.deleteOne(id);
         }

    async forgetPassword(dto) {
        const user = await this.userDao.getOneByEmail(dto.email);
        user.password = dto.password;

        return this.userDao.updateOne(user.id, user);
    }
}

export default UserManager;