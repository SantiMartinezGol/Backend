import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) => {
    return await jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '3h' });
}

export const generateUniqueKey = (size) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';

    while (key.length < size) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomCharacter = characters[randomIndex];
        key += randomCharacter;
    }

    return key;
}


