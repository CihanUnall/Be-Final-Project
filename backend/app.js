import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./db/mongoose.connect.js";
import { welcomeRouter } from "./router/welcomeRouter.js";

const app = express();
const PORT = 5517;

app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:7134",
    credentials: true,
  })
);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.get("/", welcomeRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
