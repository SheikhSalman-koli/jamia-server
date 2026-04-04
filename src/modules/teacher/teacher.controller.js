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

const getTeacherById = async (req, res) => {
    try {
        const result = await teacherService.getTeacherById(req?.params.id)
        res.status(200).send({
            success: true,
            message: "Teacher retrieved successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        await teacherService.deleteTeacher(id)

        return res.status(200).json({
            success: true,
            message: "ছাত্রের তথ্য সফলভাবে মুছে ফেলা হয়েছে" // Teacher deleted successfully
        });
    } catch (error) {
        if (error.message === 'INVALID_ID') {
            return res.status(400).json({ success: false, message: "অকার্যকর আইডি (Invalid ID)" });
        }
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: "ছাত্র খুঁজে পাওয়া যায়নি" });
        }
        return res.status(500).json({ success: false, message: "সার্ভার ত্রুটি (Server Error)" });
    }
};

export const teacherController = {
    createTeacher,
    getTeacher,
    getTeacherById,
    deleteTeacher
}