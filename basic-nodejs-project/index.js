require('dotenv').config()    // Added .env file security purpose to store your sensetive data
const express = require('express');  // common js
// import express from "express" // ES Modular JS  

// Create an Express Application Instance
// now app is the main object that handles all server logic
const app = express()

const port = 5000    // virtual port where the server will listen

app.get('/', (req, res) => {
    res.send('Hello, Welcome to My Website!')   // 
})

app.get("/login", (req, res) => {
    res.send("<h1>Please login</h1>")
})  

app.get('/aboutme', function(req,res) {
    res.send("<h2>SuhAil MAnzoor - Software Engineer</h2>")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})