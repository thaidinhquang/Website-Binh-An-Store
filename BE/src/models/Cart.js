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
                image:{
                    type:String
                },
                price:{
                    type: Number,
                    min: 0,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                variants:{
                    type: [{ key: String, value: String , _id: false,}],
                   
                }
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);