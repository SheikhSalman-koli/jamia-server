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
        const query = req?.query
        const result = await studentService.getStudent(query)
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


const updateStudent = async (req, res) => {
    try {
        const {id} = req?.params
       const updatedData = req?.body
        const result = await studentService.updateStudent(id, updatedData)
        res.status(200).send({
            success: true,
            message: "Student updated successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await studentService.deleteStudent(id)

        return res.status(200).json({
            success: true,
            message: "ছাত্রের তথ্য সফলভাবে মুছে ফেলা হয়েছে" // Student deleted successfully
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


const getStats = async (req, res) => {
  try {
    const data = await studentService.getStudentAnalytics()
    
    res.status(200).json({
      success: true,
      message: "পরিসংখ্যান সফলভাবে পাওয়া গেছে",
      data: {
        summary: data?.totalStats[0] || { totalStudents: 0, totalNewStudents: 0, totalOldStudents: 0, todayAdmitted: 0, totalCost:0, totalKhurakiAmount: 0, todayNewAdmitted:0, todayOldAdmitted:0 },
        byDepartment: data?.departmentStats,
        byClass: data?.classStats,
        dailyTrend: data?.dailyAdmissions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "সার্ভার এরর",
      error: error.message
    });
  }
};


export const sutdentController = {
    createStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStats
}