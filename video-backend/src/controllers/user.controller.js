const User = "Respone is recevied from Server";
const registerUser = async (req, res, next) => {
    try {
        res.status(200).json({
            message: User
        })
    } catch (error) {
        next(error)
    }
}

export { registerUser }



// recommended below code, with asyncHandler wrapper to handle errors
//  in async functions no need to use try catch block in every controller function

// import { asyncHandler } from "../utils/asyncHandler.js";
// //with aysncHandler utility
// const registerUser = asyncHandler( async (req, res) => {
//     res.status(200).json({
//         message: "OK"
//     })
// })