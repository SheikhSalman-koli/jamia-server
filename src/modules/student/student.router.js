import { Router } from "express";
import { sutdentController } from "./student.controller.js";

const router = Router()

router.post('/', sutdentController.createStudent)

router.get('/', sutdentController.getStudent)

router.get('/student/stats', sutdentController.getStats)

router.get('/:id', sutdentController.getStudentById)

router.patch('/update/:id', sutdentController.updateStudent)


export const studentRouter = router