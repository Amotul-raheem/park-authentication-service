import express from "express"
import bcrypt from "bcryptjs";
import joi from "joi";
import {v4 as uuidv4} from 'uuid';
import User from "../models/User.js";
import {sendResetPasswordEmail} from "../clients/ParkNotificationServiceClient.js";


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
        const resetToken = uuidv4();

        user.reset_token = resetToken
        user.reset_token_creation_date = Date.now();

        await user.save()

        const link = `${process.env.BASE_URL}/reset-password/${resetToken}`;
        sendResetPasswordEmail(link, user.email, user.username)
        res.status(200).send("Password reset link sent to your email");
    } catch (error) {
        res.status(500).send(error);
    }
})

// reset-password route
const passwordValidator = joi.object({
    password: joi.string().min(6).required()
})

passwordRouter.post("/reset-password/:resetToken", async (req, res) => {
    try {
        const {error} = await passwordValidator.validateAsync(req.body);
        if (error) {
            res.status(400).send(error.details[0].message)
        }

        const user = await User.findOne({reset_token: req.params.resetToken});
        if (!user) return res.status(400).send("Invalid Token");

        if (isTokenExpired(user.reset_token_creation_date)) {
            res.status(401).send("Link provided has expired")
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.reset_token_creation_date = null;
        user.reset_token = null;
        await user.save();

        res.status(200).send("Password reset successfully.");

    } catch (error) {
        res.status(500).send(error);
    }
});

const isTokenExpired = (restTokenCreationDate) => {
    const now = Date.now();
    const diff = (now - restTokenCreationDate) / 1000;

    return diff > process.env.RESET_TOKEN_EXPIRATION;
}

export {passwordRouter}