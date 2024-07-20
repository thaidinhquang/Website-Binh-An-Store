import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    
    gallery: {
        type: Array,
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
    attributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attribute",
            default: null
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
