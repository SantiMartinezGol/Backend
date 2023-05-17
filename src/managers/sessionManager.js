import UserMongooseDao from "../daos/userMongooseDao.js";
import UserManager from "./userManager.js";
import { createHash, isValidPassword } from "../utils/index.js";

class SessionManager {
    constructor() {
        this.userDao = new UserMongooseDao();
    }

    async login(data) {
        const { email, password } = data;
        if (!email || !password) {
            throw new Error('Email o Password invalid format.');
        }
        const user = await this.userDao.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password);

        if (!isHashedPassword) {
            throw new Error( 'Login failed, invalid password.');
        };
        return user;
    }

    async logout() {
        req.session.destroy(err => {
            if (!err) {
                return
            }
            throw new Error( 'Logout error');
        });

    }

    async signup(data) {
        const manager = new UserManager();
        const dto = {
            ...data,
            password: await createHash(data.password, 10)
        }
        const user = await manager.create(dto);
        return user
    };

    async forgetPassword(data) {
        const { email, password } = data;      
        const dto = {
          email,
          password: await createHash(password, 10)
        };
        const user = await this.userDao.getOneByEmail(email);
     };
};

export default SessionManager