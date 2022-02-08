import jwt from "jsonwebtoken";

const authVerify = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    console.log(token)

    try {
        const verifiedUserId = jwt.verify(token, process.env.TOKEN_STRING);
        console.log(verifiedUserId)
        console.log(req)
        req.userId = verifiedUserId;
        console.log("User verified")
        console.log(req)
        next();
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}


export default authVerify;