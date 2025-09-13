import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const router = Router();

router.route('/user').post((req,res)=>{
    res.send("hello");
});
router.route('/register').post(registerUser);


export default router