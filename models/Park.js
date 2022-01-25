import mongoose from "mongoose";

const Schema = mongoose.Schema;

const parkSchema = new Schema({
    location: {
        id: Number,
        type: String,
        required: true
    },
    state: String,
    city: String,
    country: String,
    numberParks: Number,
    park: {
        name: String,
        numberSpaces: Number,
        space: {
            space_id: Number,
            location_id: Number,
            name: String,
            status: String
        }
    }
})

module.exports = mongoose.model("Park", parkSchema);
