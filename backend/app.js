import express from "express";
import logger from "./middleware/logger.js";
import authRoutes from "./routes/auth.js";
import errorHandler from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/mongoose.connect.js";
import orderRouter from "./routes/orderRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productRoutes from "./routes/productRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:7134",
    credentials: true,
  })
);

// Routes
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Datenbank verbinden
connectDB();
//  Logger aktivieren
app.use(logger);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
