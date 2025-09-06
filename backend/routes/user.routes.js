import { Router } from "express";

const router = Router();

router.route('/user').post((req,res)=>{
    res.send("hello");
});

export default router