import { Router } from "express";
import { teacherController } from "./teacher.controller.js";

const router = Router()

router.post('/', teacherController.createTeacher)

router.get('/', teacherController.getTeacher)

router.get('/:id', teacherController.getTeacherById)

router.delete('/delete/:id', teacherController.deleteTeacher)

export const teacherRouter = router