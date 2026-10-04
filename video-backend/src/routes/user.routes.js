import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

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
// router.route("/login").post(loginUser)            // all users related routes is here
// router.route("/profile").post(profileUser)

export default router