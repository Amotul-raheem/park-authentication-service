import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
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
        card_number: Number,
        card_type: String,
        expiry_month: Date(),
        expiry_year: Date(),
        security_code: Number
    },
    Booking: {
        space_id: Number,
        check_in: Date(),
        check_out: Date(),
        booking_time: String,
        booking_reference_no: Number,
        booking_status: String,
        total_price: Number,
        payment_status: String
    }
})
module.exports = mongoose.model("User", userSchema);