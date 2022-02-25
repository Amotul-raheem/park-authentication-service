import express from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import joi from "joi";
import dotenv from "dotenv";
import {v4 as uuidv4} from 'uuid';
import User from "../models/User.js";
import authVerify from "../middleWare/AuthVerify.js"
import {sendEmail} from "../clients/ParkNotificationServiceClient.js";
import isTokenExpired from "../Utilities/TokenExpiration.js"

dotenv.config()
const authenticationRouter = express.Router();

// sign-up route
const signUpValidator = joi.object({
    username: joi.string().min(3).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().min(6).required()
});

authenticationRouter.post("/sign-up", async (req, res) => {
    try {
    const {error} = await signUpValidator.validateAsync(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    }
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) {
            res.status(400).send("Email already exists.");
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const verificationToken = uuidv4();
        
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            verification_token: verificationToken,
            verification_token_creation_date: Date.now()
        });

        const link = `${process.env.BASE_URL}/verify-email/${verificationToken}`;
        const VERIFY_EMAIL_URL = process.env.VERIFY_EMAIL_URL

        // Send email verification to user in notification service
        sendEmail(link, req.body.email, req.body.username, VERIFY_EMAIL_URL)
        
        const savedUser = await user.save();
        res.status(200).send("user created")

         
        } catch (error) {
            res.status(500).send(error);
        }
    });

// sign in Route

const signInValidator = joi.object({
    email: joi.string().min(3).required().email(),
    password: joi.string().min(6).required()
});

authenticationRouter.post("/sign-in", async (req, res) => {
    const {error} = await signInValidator.validateAsync(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Incorrect Email");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Incorrect password");

    if (!user.isVerified){
        return res.status(401).send('Your Email has not been verified. Please click on resend');
    }

    try {
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_STRING, {expiresIn: '1h'});
        res.header("auth-token", token)
        res.status(200).send("Login successfully")
    } catch (error) {
        res.status(500).send(error);
    }
});

// Email verification route
authenticationRouter.post("/verify-email/:verification_token", async (req, res) => {
    try {
    //Checks if user's token exists in database
    const user = await User.findOne({verification_token: req.params.verification_token});
    if (!user) return res.status(400).send("Invalid Token");

    //Checks if token has expired
    if (isTokenExpired(user.verification_token_creation_date)) {
        res.status(401).send("Link provided has expired")
    }
    user.isVerified = true;
    user.verification_token_creation_date = null;
    user.verification_token = null;
    await user.save();

    res.status(200).send("Email verified successfully.");

    } catch (error) {
        res.status(500).send(error);
    }
})


export {authenticationRouter}