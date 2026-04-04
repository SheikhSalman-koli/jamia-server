import { Teacher } from "../../models/teacher.js"

const createTeacher = async(newTeacher) => {
    const result = await Teacher.create(newTeacher)
    return result
}

const getTeacher = async() => {
    const result = await Teacher.find()
    return result
}

const getTeacherById = async(id) => {
    const result = await Teacher.findOne({ _id: id })
    return result
}

const deleteTeacher = async (id) => {
    const result = await Teacher.deleteOne({ _id: id })
    return result
}

export const teacherService = {
    createTeacher,
    getTeacher,
    getTeacherById,
    deleteTeacher
}