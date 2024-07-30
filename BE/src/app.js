import http from "http";
import express from "express";
import { initializeSocketIO } from "./middlewares/trackUserEditPost.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { listenEvent } from "./controllers/order.js";
import { checkDeliveredOrderJob } from "./job/orderJob.js";

const app = express();
dotenv.config();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const { DB_URI, PORT } = process.env;

await mongoose
  .connect(DB_URI)
  .then(() => {
    mongoose.set("strictQuery", false);
    console.log("connect to database successfully");
  })
  .then(() => {
    checkDeliveredOrderJob();
  });

app.post("/webhook", express.raw({ type: "application/json" }), listenEvent);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    name: err.name,
    message: err.message,
  });
});

initializeSocketIO(io);

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});