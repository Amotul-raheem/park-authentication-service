import express from "express";
import bodyParser from "body-parser";
import {authenticationRouter} from "./routes/AuthenticationRouter.js";
import {mongodbConnection} from "./db.js";
import dotenv from "dotenv";
import {passwordRouter} from "./routes/PasswordRouter.js"

dotenv.config()

const app = express();

mongodbConnection()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT

app.use("/api", authenticationRouter);
app.use("/api", passwordRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});