// import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";



// const connection = require("./db")

//database connection
// connection()
// dotenv.config();

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const CONNECTION_URL = 'mongodb+srv://booking:booking@cluster0.sk0vq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000

try{
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log ("Server is up and running:"));
} catch (error){
    console.log(error.message)
}

// app.get("/", (req,res) => {
//     res.send("hello World")
// });

app.post("/signup", (req,res) => {
    const{password,email} = req.body;
    console.log(password,email);

    res.send("hello World")
});




app.listen(5000, (req,res) => {
    console.log(`server is running on port ${PORT}`)
});