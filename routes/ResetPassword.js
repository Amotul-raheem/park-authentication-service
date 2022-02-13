import express from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import joi from "joi";
import {v4 as uuidv4} from 'uuid';


import User from "../models/User.js";
import Token from "../models/token.js"


const passwordRouter = express.Router();


//forgot-password route

const emailValidator = joi.object({
    email: joi.string().min(3).required().email(),
})

passwordRouter.post("/forgot-password", async (req, res) => {
    try {
        const {error} = await emailValidator.validateAsync(req.body);
        if (error) {
            res.status(400).send(error.details[0].message)
        }
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(400).send("Incorrect Email");
        }
        let token = await Token.findOne({userId: user._id});
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: uuidv4()
            }).save();
        }
        
        const link = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
        res.status(200).send("Password reset link sent to your email");
        console.log(link)
    } catch (error) {
        res.status(500).send(error);
    }
})

// reset-password route

const passwordValidator = joi.object({
    password: joi.string().min(6).required()
})
passwordRouter.post("/reset-password/:userId/:token", async (req, res) => {
    try {
        const {error} = await passwordValidator.validateAsync(req.body);
        if (error) {
            res.status(400).send(error.details[0].message)
        }

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("Access denied.");

        const token = await Token.findOne({
            userId: user._id, token: req.params.token,
        });
        if (!token) return res.status(400).send("invalid link or expired");

        const salt = await bcrypt.genSalt(process.env.SALTROUNDS);
        const newHashedPassword = await bcrypt.hash(req.body.password, salt);

        user.password = newHashedPassword;
        await user.save();
        await token.delete();

        res.status(200).send("Password reset sucessfully.");

    } catch (error) {
        res.status(500).send(error);
    }
});
export {passwordRouter}