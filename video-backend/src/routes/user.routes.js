import { Router } from "express";
import { registerUser , loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyJWToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        },
    ]),
    registerUser)  // call controller here 
router.route("/login").post(loginUser)    

router.route("/logout").post(verifyJWToken, logoutUser)

// all users related routes is here
// router.route("/profile").post(profileUser)

export default router