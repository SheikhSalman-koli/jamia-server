import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({

    name: {type: String, required: true},
    fatherName: {type: String, required: true},
    class: {type: String, required: true},
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
    nid: {type: Number, required: true, unique: true},
    fatherNid: {type: Number, required: true, unique: true},
    status: {type: String, default: 'active'},
    category: {type: String, required: true},

}, { versionKey: false })

export const Student = mongoose.model('Students', studentSchema)