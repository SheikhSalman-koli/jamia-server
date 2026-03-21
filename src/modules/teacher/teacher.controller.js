import { teacherService } from "./teacher.service.js";

const createTeacher = async (req, res) => {
    try {
        const result = await teacherService.createTeacher(req?.body)
        res.status(200).send({
            success: true,
            message: "Teacher create successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

const getTeacher = async (req, res) => {
    try {
        const result = await teacherService.getTeacher()
        res.status(200).send({
            success: true,
            message: "Teacher retrived successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

export const teacherController = {
    createTeacher,
    getTeacher
}