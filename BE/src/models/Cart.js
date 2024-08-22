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
                name: {
                    type: String,
                    required: true,
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "ProductItem",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);