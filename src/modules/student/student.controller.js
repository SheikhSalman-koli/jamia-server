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


const getStats = async (req, res) => {
  try {
    const data = await studentService.getStudentAnalytics()
    
    res.status(200).json({
      success: true,
      message: "পরিসংখ্যান সফলভাবে পাওয়া গেছে",
      data: {
        summary: data?.totalStats[0] || { totalStudents: 0, newStudents: 0, oldStudents: 0, todayAdmitted: 0 },
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
    getStats
}