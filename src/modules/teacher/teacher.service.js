import { Teacher } from "../../models/teacher.js"

const createTeacher = async(newTeacher) => {
    const result = await Teacher.create(newTeacher)
    return result
}

const getTeacher = async() => {
    const result = await Teacher.find()
    return result
}

export const teacherService = {
    createTeacher,
    getTeacher
}