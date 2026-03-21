import { Router } from "express";
import { teacherController } from "./teacher.controller.js";

const router = Router()

router.post('/', teacherController.createTeacher)

router.get('/', teacherController.getTeacher)


export const teacherRouter = router