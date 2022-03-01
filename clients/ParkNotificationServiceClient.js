import axios from "axios";


const sendEmail = async(link, email, username, endpoint, emailType) => {
   await axios.post(endpoint, {
        email: email,
        username: username,
        link: link
    })
        
}
export default sendEmail
