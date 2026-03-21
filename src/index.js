import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userRouter } from './modules/user/user.router.js';
import { studentRouter } from './modules/student/student.router.js';
import { teacherRouter } from './modules/teacher/teacher.router.js';


const port = process.env.PORT || 5000
const app = express()


//middleware
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Hello World from jamia server')
})

app.use('/users', userRouter)

app.use('/students', studentRouter)

app.use('/teachers', teacherRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
