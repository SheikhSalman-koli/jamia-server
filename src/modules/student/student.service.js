import { Student } from "../../models/student.js"

const createStudent = async (newStudent) => {
    const result = await Student.create(newStudent)
    return result
}

const getStudent = async (query) => {

    const { searchTerm, department, class: selectedClass, bloodGroup, status, category } = query;

    let searchQuery = {};

    // ১. গ্লোবাল সার্চ (নাম, ফোন অথবা এনআইডি দিয়ে)
    if (searchTerm) {
        searchQuery.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { fatherName: { $regex: searchTerm, $options: "i" } }
        ];
    }

    // ২. স্পেসিফিক ফিল্টার (যদি সিলেক্ট করা থাকে)
    if (department) searchQuery.department = department;
    if (selectedClass) searchQuery.class = selectedClass; // 'class' কিউওয়ার্ড সরাসরি ফিল্ড হিসেবে থাকলে
    if (bloodGroup) searchQuery.bloodGroup = bloodGroup;
    if (status) searchQuery.status = status;
    if (category) searchQuery.category = category;

    const result = await Student.find(searchQuery).sort({ createdAt: -1 })
    return result
}

const getStudentById = async (id) => {
    const result = await Student.findOne({ _id: id })
    return result
}


const updateStudent = async(id, data) => {

    const result = await Student.findOneAndUpdate(
        { _id: id },
        {$set: data},
        {returnDocument: 'after'}
    )

    return result
}


const getStudentAnalytics = async () => {

    const todayDateString = new Date().toISOString().split('T')[0];

    const stats = await Student.aggregate([
        {
            $facet: {
                // ১. মোট পরিসংখ্যান
                totalStats: [
                    {
                        $group: {
                            _id: null,
                            totalStudents: { $sum: 1 },

                            // ১. সর্বমোট খোরাকীর টাকা (Sum of all students' fee)
                            totalKhurakiAmount: { $sum: "$definedFee" }, // এখানে আপনার ফিল্ডের নাম দিন (যেমন: monthlyFee)

                            // ২. মোট নতুন ছাত্র
                            totalNewStudents: {
                                $sum: { $cond: [{ $eq: ["$type", "নতুন"] }, 1, 0] }
                            },

                            // ৩. মোট পুরাতন ছাত্র
                            totalOldStudents: {
                                $sum: { $cond: [{ $eq: ["$type", "পুরাতন"] }, 1, 0] }
                            },

                            // ৪. আজকের মোট ভর্তি (নতুন + পুরাতন মিলে)
                            todayAdmitted: {
                                $sum: {
                                    $cond: [
                                        { $eq: [{ $substr: ["$createdAt", 0, 10] }, todayDateString] },
                                        1, 0
                                    ]
                                }
                            },

                            // ৫. আজকের দিনের "নতুন" ভর্তি
                            todayNewAdmitted: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $eq: [{ $substr: ["$createdAt", 0, 10] }, todayDateString] },
                                                { $eq: ["$type", "নতুন"] }
                                            ]
                                        },
                                        1, 0
                                    ]
                                }
                            },

                            // ৬. আজকের দিনের "পুরাতন" ভর্তি
                            todayOldAdmitted: {
                                $sum: {
                                    $cond: [
                                        {
                                            $and: [
                                                { $eq: [{ $substr: ["$createdAt", 0, 10] }, todayDateString] },
                                                { $eq: ["$type", "পুরাতন"] }
                                            ]
                                        },
                                        1, 0
                                    ]
                                }
                            }
                        }
                    }
                ],

                // ২. বিভাগ ভিত্তিক পরিসংখ্যান
                departmentStats: [
                    {
                        $group: {
                            _id: "$department",
                            total: { $sum: 1 },
                            new: { $sum: { $cond: [{ $eq: ["$type", "নতুন"] }, 1, 0] } },
                            old: { $sum: { $cond: [{ $eq: ["$type", "পুরাতন"] }, 1, 0] } }
                        }
                    }
                ],

                // ৩. ক্লাস/জামাত ভিত্তিক পরিসংখ্যান
                classStats: [
                    {
                        $group: {
                            _id: "$class",
                            total: { $sum: 1 },
                            new: { $sum: { $cond: [{ $eq: ["$type", "নতুন"] }, 1, 0] } },
                            old: { $sum: { $cond: [{ $eq: ["$type", "পুরাতন"] }, 1, 0] } }
                        }
                    }
                ],

                // ৪. তারিখ অনুযায়ী ছাত্র ভর্তি (Chart-এর জন্য)
                dailyAdmissions: [
                    {
                        $group: {
                            _id: { $substr: ["$createdAt", 0, 10] },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: 1 } }, // তারিখ অনুযায়ী ছোট থেকে বড় সাজানো
                    { $project: { _id: 0, date: "$_id", count: 1 } }
                ]


            }
        }
    ]);

    return stats[0];
};



export const studentService = {
    createStudent,
    getStudent,
    getStudentById,
    updateStudent,
    getStudentAnalytics
}