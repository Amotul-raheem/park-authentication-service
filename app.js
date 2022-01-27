// import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {mongodbConnection} from "./db.js"



const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT || 5000

mongodbConnection();


app.post("/signup", (req, res) => {
    console.log(MONGODB_CONNECTION_URL)
    const {first_name, last_name, username, password, email} = req.body;
    console.log(first_name, last_name, username, password, email);

    res.send("hello World")
});

app.listen(5000, (req, res) => {
    console.log(`server is running on port ${PORT}`)
});