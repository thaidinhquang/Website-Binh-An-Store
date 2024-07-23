import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

brandSchema.plugin(mongoosePaginate);

export default mongoose.model("Brand", brandSchema);
