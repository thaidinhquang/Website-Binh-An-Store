import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
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
      type: [{ key: String, value: [String] }],
      default: [],
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: false,
  }
);

export default mongoose.model("ProductItem", productItemSchema);
