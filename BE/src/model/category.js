import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
    versionKey: false
})
export default mongoose.model("Category", categorySchema)

