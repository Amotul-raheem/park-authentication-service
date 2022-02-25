
import axios from "axios";


export const sendEmail = (Link, email, username, URL) => {
    axios.post(URL, {
        email: email,
        username: username,
        Link: Link
    })
        .then(res => {
            console.log("Email Sent Successfully for " + username)
        })
        .catch(error => {
            throw new Error("Unable to send out reset password email")
        })
}
