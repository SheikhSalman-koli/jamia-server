import mongoose from "mongoose";


const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    designation: { type: String, required: true }, // নতুন যুক্ত
    department: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, // ইউনিক রাখা ভালো
    image: { type: String, required: true },
    bloodGroup: { type: String },
    nid: { type: Number, required: true, unique: true },
    salary: { type: Number, default: 0 }, // নতুন যুক্ত
    joiningDate: { type: Date, default: Date.now }, // নতুন যুক্ত
    status: { type: String, default: 'সক্রিয়' },
    category: { type: String }, // যেমন: পূর্ণকালীন/খণ্ডকালীন
    permanentAddress: { type: String },
    temporaryAddress: { type: String },
    addedBy: { type: String },
}, { 
    versionKey: false, 
    timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt হ্যান্ডেল করবে
});

export const Teacher = mongoose.model('Teachers', teacherSchema)