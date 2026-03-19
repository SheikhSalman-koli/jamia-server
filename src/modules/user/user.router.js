import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router()

router.post('/', userController.createUser)

router.get('/', userController.getAllUser)

router.get('/byemail', userController.getUserByEmail)

export const userRouter = router