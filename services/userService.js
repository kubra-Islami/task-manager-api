import UserModel from "../models/UserModel.js";

const createUser = async (user) => {
    // console.log("Reached service");
    // console.log("Service received user:", user);
    if (!user) throw new Error('User is required');
    return await UserModel.createUser({...user})
};


export default {
    createUser,
}