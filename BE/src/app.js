import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import categoryRouter from "./routes/category";


import { connectDB } from "./config/db";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use("/api", categoryRouter)

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/", consolelog("sv running on port:8080..."));

mongoose.connect("mongodb://127.0.0.1:27017/DATN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Sự kiện khi kết nối thành công
mongoose.connection.on("connected", () => {
    console.log("Kết nối đến MongoDB thành công");
});

// Sự kiện khi kết nối bị lỗi
mongoose.connection.on("error", (err) => {
    console.error("Kết nối đến MongoDB thất bại:", err);
});

// Sự kiện khi ngắt kết nối
mongoose.connection.on("disconnected", () => {
    console.log("Ngắt kết nối đến MongoDB");
});

export const viteNodeApp = app;
