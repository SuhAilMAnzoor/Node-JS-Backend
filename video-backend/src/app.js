import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import the registerUser() controller using app.post direct without router
import { registerUser }  from "./controllers/user.controller.js"
app.post("/api/v1/users/register", registerUser)


export { app }