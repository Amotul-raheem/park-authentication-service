
import axios from "axios";


export const sendEmail = (link, email, username, endpoint, emailType) => {
    axios.post(endpoint, {
        email: email,
        username: username,
        link: link
    })
        .then(() => {
            console.log(emailType + " Email Sent Successfully for " + username)
        })
        .catch(() => {
            throw new Error("Unable to send out " + emailType + " email")
        })
}
