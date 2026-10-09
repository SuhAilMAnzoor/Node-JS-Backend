import { Router } from "express";
import { registerUser , loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
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

// secured routes
router.route("/logout").post(verifyJWToken, logoutUser)
router.route("/refreshAccessToken").post(refreshAccessToken)

export default router