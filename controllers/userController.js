import userService from '../services/userService.js';

const AddUser = async (request, response) => {
    // console.log("Reached controller");
    // console.log("Request body:", request.body);
    try{
        const {name,email, password} = request.body;
        const user = {name, email, password};
        const result = await userService.createUser(user);

        response.status(201).json({
            status: "success",
            result,
        });
    }catch(err){
        response.status(500).json({
            status: "failed",
            error: err.message
        })
    }
}

export default {
    AddUser,
}