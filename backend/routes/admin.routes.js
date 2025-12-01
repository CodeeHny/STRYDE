import { Router } from "express";
import { adminLogin } from "../controller/admin.controller.js";
import { checkIsAdmin, verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route('/login').post(adminLogin);
router.route('/test').post(verifyJWT,checkIsAdmin, (req, res)=> {
    res.send("hellow")
});
export default router;