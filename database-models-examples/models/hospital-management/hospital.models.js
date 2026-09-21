import mongoose from "mongoose"

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    addressLane1: {
        type: String,
        required: true,
    },
    addressLane2: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    specializedIn: [
        {
            type: String,
        }
    ]
}, { timestamps: true });

export const Hospital = mongoose.model("Hospital", HospitalSchema)
