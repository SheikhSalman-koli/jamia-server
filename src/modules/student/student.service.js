import { Student } from "../../models/student.js"

const createStudent = async(newStudent) => {
    const result = await Student.create(newStudent)
    return result
}

const getStudent = async() => {
    const result = await Student.find()
    return result
}

const getStudentById = async(id) => {
    const result = await Student.findOne({ _id: id })
    return result
}

export const studentService = {
    createStudent,
    getStudent,
    getStudentById
}