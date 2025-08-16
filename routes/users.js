import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";


// router.post('/add_user',userController.AddUser);
router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)

router.get("/task", authMiddleware, (req, res) => {
    console.log(req.user);
    res.json({ status: "success", user: req.user });
});


export default router;
