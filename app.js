import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {router} from "./routes/auth.js";
import {mongodbConnection} from "./db.js";

dotenv.config()


const app = express();

mongodbConnection()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT || 5000


app.use("/users", router);


app.listen(5000, (req, res) => {
    console.log(`server is running on port ${PORT}`)
});