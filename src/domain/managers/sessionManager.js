import UserManager from "./userManager.js";
import { createHash, isValidPassword, generateToken } from "../../shared/index.js";
import loginValidation from "../../domain/validations/session/loginValidation.js";
import container from "../../container.js"

class SessionManager {
    constructor() {
        this.userRepository = container.resolve("UserRepository") ;
    }

    async login(data) {      
        const { email, password } = data;
        await loginValidation.parseAsync(data); 

        const user = await this.userRepository.getOneByEmail(email);     
        if(!user)
        {
            throw new Error ("User Not Found")
        } 

        const isHashedPassword = await isValidPassword(password, user.password);
        if (!isHashedPassword) {
            throw new Error('Login failed, invalid password.');
        };
        const dto = { ...user, password: undefined }
        const accessToken = await generateToken(dto);

        if (!accessToken) {
            throw new Error('Login failed, invalid session.')
        }
        return accessToken;
    }

    async signup(data) {
        const manager = new UserManager();
        const dto = {
            ...data,
            password: await createHash(data.password, 10)
        }
        const user = await manager.create(dto);
        if (!user) 
        {
            throw new Error('Login failed, invalid session.')
        }

        return user
    };

    async forgetPassword(data) {
        const { email, password } = data;
        const dto = {
            email,
            password: await createHash(password, 10)
        };
        const user = await this.userRepository.getOneByEmail(email);
    };
};

export default SessionManager