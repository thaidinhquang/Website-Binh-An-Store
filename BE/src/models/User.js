import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "member",
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        age: {
            type: Number,
        },
        avatar: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);