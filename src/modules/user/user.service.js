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

const updateUserRole = async(email, data) => {
    //  const user = await User.findOne(email)
    const targetEmail = typeof email === 'object' ? email?.email : email;

    const result = await User.findOneAndUpdate(
        {email: targetEmail},
        {$set: data},
        {returnDocument: 'after'}
    )

    return result
}

export const userService = {
    createUser,
    getAllUser,
    getUserByEmail,
    updateUserRole
}