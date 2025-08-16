import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const createUser = async (user) => {
    if (!user) throw new Error('User is required');

    const existingUser = await UserModel.getUserByEmail(user.email);
    if (existingUser) {
        throw new Error('Email already in use');
    }

    return await UserModel.createUser(user);
};

const loginUser = async ({email, password}) => {
    const user = await UserModel.getUserByEmail(email);
    if (!user) throw new Error('User Not Found');

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new Error('Invalid password');

    const token = await jwt.sign({id:user.id , email : user.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    return {user , token};
}


export default {
    createUser,
    loginUser
}