import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/mongoose.connect.js";
import orderRouter from "./routes/orderRouter.js";
import cartRouter from "./routes/cartRouter.js";

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
app.use(express.json());

// Routes
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
