import express from "express";
import bodyParser from "body-parser";
import {authRouter} from "./routes/auth.js";
import {mongodbConnection} from "./db.js";
import dotenv from "dotenv"

dotenv.config()

const app = express();

mongodbConnection()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT

app.use("/users", authRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});