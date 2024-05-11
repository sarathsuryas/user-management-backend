import express, { Router } from "express";
const router:Router = express.Router();
import * as userController from "../controller/userController";

router.post('/signin-submit',userController.signupSubmit)
router.post('/login-submit',userController.loginSubmit)


export default router;