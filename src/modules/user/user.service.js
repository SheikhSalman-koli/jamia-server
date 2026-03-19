import { User } from "../../models/user.js";


const createUser = async(newUser) => {
    const result = await User.create(newUser)
    return result
}

const getAllUser = async() => {
     const result = await User.find()
    return result
}

const getUserByEmail = async(email) => {
     const result = await User.findOne(email)
    return result
}

export const userService = {
    createUser,
    getAllUser,
    getUserByEmail
}