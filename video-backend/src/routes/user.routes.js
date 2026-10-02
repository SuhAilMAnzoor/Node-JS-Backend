import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)  // call controller here 
// router.route("/login").post(loginUser)            // all users related routes is here
// router.route("/profile").post(profileUser)

export default router