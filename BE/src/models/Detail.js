import mongoose from "mongoose";

const detailSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    isSelectedInputType: {
      // input or select component
      type: Boolean,
      default: false,
    },
    values: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Detail", detailSchema);
