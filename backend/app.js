import express from "express";
import logger from "./db/middleware/logger.js";
import authRoutes from "./router/authRoutes.js";
import errorHandler from "./db/middleware/errorMiddleware.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/mongoose.connect.js";
import productRoutes from "./routes/productRoutes.js";


const app = express();
app.use(express.json());


dotenv.config();
app.use(
  cors({
    origin: "http://localhost:7134",
    credentials: true,
  })
);

app.use("/api/products", productRoutes);


//  Logger aktivieren
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//  Willkommen Controller


app.use(errorHandler);

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
