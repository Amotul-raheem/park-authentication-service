import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    card: {
       card_number: {
           type: Number,
       },
       card_type: {
           type: String,
        },
        expiry_month: {
           type: Date,
        },
        expiry_year: {
           type: Date,
        },
        security_code: {
           type: Number,
        }
    }
})

const User = mongoose.model('User', userSchema);
export default User;
