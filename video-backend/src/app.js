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

//define registerUser Routes using app.post() method,   
//and call direct registerUser() controller without defining proper seperate routes file

// import { registerUser }  from "./controllers/user.controller.js"
// app.post("/api/v1/users/register", registerUser)


// // import routes  -  Recommended Approch in professional development
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users", userRouter)


export { app }