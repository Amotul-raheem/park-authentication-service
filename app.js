import express from "express";
import bodyParser from "body-parser";
import {authRouter} from "./routes/auth.js";
import {mongodbConnection} from "./db.js";
import dotenv from "dotenv"
import authVerify from "./middleWare/authVerify.js";

dotenv.config()

const app = express();

mongodbConnection()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT


app.use("/users", authRouter);

app.use("/testing", authVerify, function (req, res) {
    console.log(req)
    console.log("No middle ware")
    res.send("this is fine")
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});