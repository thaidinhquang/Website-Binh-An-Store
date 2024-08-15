import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      unique: true,
    }
  },
  { timestamps: true, versionKey: false }
);

brandSchema.plugin(mongoosePaginate);

export default mongoose.model("Brand", brandSchema);
