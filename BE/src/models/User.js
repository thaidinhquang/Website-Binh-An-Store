import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        password: {
            type: String,
            default: ''
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
        otp: {
            type: String,
        },
        otpCreatedAt: {
            type: Date,
        },
    },
    { timestamps: true, versionKey: false }
);

userSchema.plugin(mongoosePaginate);

export default mongoose.model("User", userSchema);