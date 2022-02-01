import express from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import joi from "joi";


const authRouter = express.Router();

const sign_upValidator = joi.object({
    first_name: joi.string().min(3).required(),
    last_name: joi.string().min(3).required(),
    username: joi.string().min(3).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().min(6).required()
});

authRouter.post("/sign_up", async (req, res) => {
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        res.status(400).send("Email already exists.");
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const {error} = await sign_upValidator.validateAsync(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
        } else {
            const savedUser = await user.save();
            res.status(200).send("user created")
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// sign_in Route

const sign_inValidator = joi.object({
    username: joi.string().min(6).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().min(6).required()
});

authRouter.post("/sign_in", async (req,res)=> {
        const {error} = await  sign_inValidator.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        else {
            const user = await User.findOne({email: req.body.email});
            if (!user) return res.status(400).send("Incorrect Email");

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return  res.status(400).send("Incorrect password");
        }

        try {
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_STRING);
            res.header("auth-token", token).send(token);
        } catch (error) {
        res.status(500).send(error);
    }
});

export {authRouter}