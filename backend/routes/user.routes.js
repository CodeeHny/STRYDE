import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";

const router = Router();

router.route('/user').post((req,res)=>{
    res.send("hello");
});
router.route('/register').post(registerUser);
router.route('/login').post(loginUser)


export default router