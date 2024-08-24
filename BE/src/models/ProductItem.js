import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: {
      type: Number,
      default: 5,
    },
    variants: {
      type: [{ key: String, value: String }],
      default: [],
      max: 2,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model("ProductItem", productItemSchema);
