import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/db";

const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());

// connect db
connectDB(process.env.DB_URI);

// routers
app.use("/", console.log("sv running on port:8080..."));


export const viteNodeApp = app;
