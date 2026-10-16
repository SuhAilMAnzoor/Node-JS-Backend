import { Router } from "express";
import { registerUser , loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/user.controller.js";
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
router.route("/change-password").post(verifyJWToken, changeCurrentPassword)
router.route("/current-user").get(verifyJWToken, getCurrentUser)
router.route("/update-account").patch(verifyJWToken, updateAccountDetails)
router.route("/avatar").patch(verifyJWToken, upload.single("avatar"), updateUserAvatar)
router.route("cover-image").patch(verifyJWToken, upload.single("coverImage"), updateUserCoverImage )
router.route("/c/:username").get(verifyJWToken, getUserChannelProfile)
router.route("/history").get(verifyJWToken, getWatchHistory )
export default router