import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        like: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislike: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

feedbackSchema.plugin(mongoosePaginate);

export default mongoose.model("Feedback", feedbackSchema);
