import mongoose from "mongoose";
import {MONGODB_CONNECTION_URL} from "./config/db.config.js"


const mongodbConnection = () => {
    try {
        mongoose.connect(MONGODB_CONNECTION_URL, {
            useNewUrlParser: true, useUnifiedTopology: true
        }, () => console.log("Mongodb is up and running:"));
    } catch (error) {
        console.log(error.message)
    }
}

export {mongodbConnection};
