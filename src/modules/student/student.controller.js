import { studentService } from "./student.service.js";

const createStudent = async (req, res) => {
    try {
        const result = await studentService.createStudent(req?.body)
        res.status(200).send({
            success: true,
            message: "Student create successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}


const getStudent = async (req, res) => {
    try {
        const result = await studentService.getStudent()
        res.status(200).send({
            success: true,
            message: "Student retrived successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

const getStudentById = async (req, res) => {
    try {
        const {id} = req?.params
       
        const result = await studentService.getStudentById(id)
        res.status(200).send({
            success: true,
            message: "Student retrived successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

export const sutdentController = {
    createStudent,
    getStudent,
    getStudentById
}