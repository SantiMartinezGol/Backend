import UserMongooseDao from "../daos/userMongooseDao.js"
import idValidation from "../validations/shared/idValidation.js"
import paginateValidation from "../validations/paginateValidation.js"
import userCreateValidation from "../validations/user/userCreateValidation.js"
import loginValidation from "../validations/session/loginValidation.js"
import userUpdateValidation from "../validations/user/userUpdateValidation.js"
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
        console.log("manager");
        console.log({...data, id});
        console.log(id,data);
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