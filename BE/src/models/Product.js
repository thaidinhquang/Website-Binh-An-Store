import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const reviewSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    updateCount: { type: Number, default: 0 },
    active: {
      type: Boolean,
      default: true,
    },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true, versionKey: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priceOld: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    gallery: {
      type: Array,
    },
    parameter: {
      type: String,
    },
    description: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
    },
    slug: {
      type: String,
      required: true,
    },
    reviews: { type: [reviewSchema], default: [] },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
        default: null,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
