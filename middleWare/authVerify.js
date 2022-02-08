import jwt from "jsonwebtoken";

const authVerify = function (req,res,next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.TOKEN_STRING);
        req.user = verified;
        console.log("User verified")
        next();
    } catch (error) {
        res.status(400).send("invalid token")
    }
}


export default authVerify