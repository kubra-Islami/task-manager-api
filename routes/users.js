import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post('/add_user',userController.AddUser);



export default router;
