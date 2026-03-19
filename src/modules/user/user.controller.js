import { userService } from "./user.service.js";

const createUser = async(req, res) => {
    try {
         const result = await userService.createUser(req.body)

                res.status(200).send({
                    success: true,
                    message: "User create successfully",
                    data: result
                });
    } catch (error) {
        console.log(error);
    }
}

const getAllUser = async(req, res) => {
    try {
         const result = await userService.getAllUser()

                res.status(200).send({
                    success: true,
                    message: "User retrived successfully",
                    data: result
                });
    } catch (error) {
        console.log(error);
    }
}

const getUserByEmail = async(req, res) => {
    try {

        const query = req?.query
         const result = await userService.getUserByEmail(query)

                res.status(200).send({
                    success: true,
                    message: "User retrived successfully",
                    data: result
                });
    } catch (error) {
        console.log(error);
    }
}

export const userController = {
    createUser,
    getAllUser,
    getUserByEmail
}