import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";


router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)



export default router;
