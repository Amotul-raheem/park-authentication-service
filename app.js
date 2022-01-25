import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const CONNECTION_URL = 'mongodb+srv://park-booking-system:parkbooking2022@cluster0.sk0vq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000


try{
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log ("Server is up and running:"));
} catch (error){
    console.log(error.message)
}
