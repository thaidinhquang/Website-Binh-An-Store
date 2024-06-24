import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ORDER_STATUS, PAYMENT_METHOD } from "../constants/order.js";
import { ROLES } from "../constants/Role.js";

const COLLECTION_NAME = "orders";
const MODEL_NAME = "Order";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "Product",
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
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    id: false,
    versionKey: false,
    timestamps: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    paymentMethod: {
      type: String,
      enum: [PAYMENT_METHOD.CASH, PAYMENT_METHOD.CARD],
      default: PAYMENT_METHOD.CASH,
    },
    totalPrice: Number,
    tax: {
      type: Number,
      default: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    receiverInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    shippingAddress: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postal_code: { type: String, required: true },
    },
    description: {
      type: String,
    },
    canceledBy: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER],
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      default: ORDER_STATUS.PENDING,
      enum: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.SHIPPING,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.DONE,
      ],
    },
  },
  {
    versionKey: false,
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

orderSchema.plugin(paginate);

export default mongoose.model(MODEL_NAME, orderSchema);
