
import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
       
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min:1
                },
               attributesId: {
                    type: [String],
                    required: true,
                },
                valuesId: {
                    type: [String],
                    required: true,
                },
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
