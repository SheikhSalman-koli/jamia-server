import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({

    name: {type: String, required: true},
    fatherName: {type: String, required: true},
    class: {type: String, required: true},
    department: {type: String, required: true},
    phone: {type: String, required: true},
    image: {type: String, required: true},
    bloodGroup: String,
    tutionFee: {type: Number, default: 4000},
    definedFee:  {type: Number, required: true,  validate: {
      validator: function(value) {
        // 'this' refers to the current document
        return value < this.tutionFee;
      },
      message: 'Defined fee ({VALUE}) must be less than the tuition fee.'
    }},
    nid: {type: String , required: true },
    fatherNid: {type: String, required: true },
    status: {type: String, default: 'সক্রিয়'},
    category: {type: String, required: true},
    type: {type: String, required: true},
    permanentAddress: {type: String },
    temporaryAddress: {type: String },
    addedBy: {type: String },
    createdAt: {type: Date}

}, { versionKey: false })

export const Student = mongoose.model('Students', studentSchema)