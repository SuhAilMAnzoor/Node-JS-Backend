// require('dotenv').config({path: './env'})  making problem in code consistence
// there require below import, it will work fine and run the code 
//  but better way we follow 

import dotenv from "dotenv"
import connectDB from './db/database.js';

dotenv.config({
    path: './env'
})


connectDB() //this is promise  // we have talked about in database file
.then(() => { // inside then we have callback function
     app.on("error", (error) => { 
        console.log("Error: application is not able to connect database", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB Connection is failed !!! ", error);
})














// import express from "express"
// const app = express()

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.
//         MONGODB_URI}/ ${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Error: application is not able to connect database", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })


//     } catch (error) {
//         console.error('ERROR :', error)
//         throw error
//     }
// })()