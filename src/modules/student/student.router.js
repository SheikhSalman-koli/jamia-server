import { Router } from "express";
import { sutdentController } from "./student.controller.js";

const router = Router()

router.post('/', sutdentController.createStudent)

router.get('/', sutdentController.getStudent)

router.get('/:id', sutdentController.getStudentById)

export const studentRouter = router