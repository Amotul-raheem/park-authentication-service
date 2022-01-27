import mongoose from "mongoose";
// import {MONGODB_CONNECTION_URL} from "./config/db.config.js"
import dotenv from "dotenv";

dotenv.config()


const mongodbConnection = () => {
    try {
        mongoose.connect(process.env.DB , {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        }, () => console.log("Mongodb is up and running:"));
    } catch (error) {
        console.log(error.message)
    }
}

export {mongodbConnection};
