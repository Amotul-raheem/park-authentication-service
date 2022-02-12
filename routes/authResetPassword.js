import express from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import joi from "joi";
import authVerify from "../middleWare/authVerify.js"


const resetPasswordRouter = express.Router();

const passwordValidator = joi.object({
    password: joi.string().min(6).required()
})
resetPasswordRouter.post("/reset-password", authVerify, async (req,res) => {
    
    const {error} = await passwordValidator.validateAsync(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(req.body.password, salt);
    try{
        user.password = newHashedPassword
        res.status(200).send("Password updated")
    } catch (error){
        res.status(500).send(error)
    }
    
    res.send("working")
})


export{resetPasswordRouter}