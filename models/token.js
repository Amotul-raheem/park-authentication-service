import mongoose from "mongoose"
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    expire_at: {
        type: Date,
        default: Date.now,
        expires: 10,
    },
});

const Token = mongoose.model("token", tokenSchema);
export default Token