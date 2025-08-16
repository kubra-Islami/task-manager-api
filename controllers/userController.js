import userService from '../services/userService.js';
import bcrypt from 'bcrypt';

const registerUser = async (request, response) => {

    try {
        const {name, email, password} = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({status: "failed", error: "All fields are required"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {name, email, password: hashedPassword};

        const result = await userService.createUser(user);

        response.status(201).json({
            status: "success",
            result,
        });

    } catch (err) {
        response.status(500).json({
            status: "failed",
            error: err.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {user, token} = await userService.loginUser(req.body);
        res.status(200).json({status: "success", user: {id: user.id, name: user.name, email: user.email}, token});
    } catch (err) {
        res.status(400).json({status: "failed", error: err.message});
    }
};


export default {
    registerUser,
    loginUser
}