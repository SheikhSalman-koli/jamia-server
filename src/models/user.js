
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: {type: String},
  googleId: {type: String},
  role: {type: String, required: true , default: 'user'},
  createdAt: {type: Date}
},{ versionKey: false });

export const User = mongoose.model('User', userSchema);
