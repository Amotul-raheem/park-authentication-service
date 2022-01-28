import mongoose from "mongoose";
// import {MONGODB_CONNECTION_URL} from "./config/db.config.js"
import dotenv from "dotenv";

dotenv.config()


const mongodbConnection= (uri, callback) => {

    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error.message)
    }
}

export {mongodbConnection};
