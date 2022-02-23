import dotenv from "dotenv";
import axios from "axios";

dotenv.config()

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL

export const sendResetPasswordEmail = (resetPasswordLink, email, username) => {
    axios.post(NOTIFICATION_SERVICE_URL, {
        email: email,
        username: username,
        resetPasswordLink: resetPasswordLink
    })
        .then(res => {
            console.log("Reset Password Sent Successfully for " + username)
        })
        .catch(error => {
            throw new Error("Unable to send out reset password email")
        })
}
