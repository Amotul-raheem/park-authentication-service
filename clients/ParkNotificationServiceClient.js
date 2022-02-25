
import axios from "axios";


export const sendEmail = (link, email, username, endpoint, emailType) => {
    axios.post(endPoint, {
        email: email,
        username: username,
        link: link
    })
        .then(res => {
            console.log(emailType + "Email Sent Successfully for " + username)
        })
        .catch(error => {
            throw new Error("Unable to send out email")
        })
}
