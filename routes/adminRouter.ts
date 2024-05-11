import express, { Router } from "express";

const router:Router = express.Router();

import * as adminController from '../controller/adminController';

router.post('/signin-submit',adminController.signinSubmit)
router.post('/login-submit',adminController.loginSubmit)
router.get('/search-user',adminController.searchUser)
router.post('/create-user',adminController.createUser)
router.put('/update-user',adminController.updateUser)
router.delete('/delete-user',adminController.deleteUser)

export default router;