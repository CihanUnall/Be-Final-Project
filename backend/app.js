import express from "express";
import logger from "./db/middleware/logger.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./db/middleware/errorMiddleware.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/mongoose.connect.js";
import authRoutes from "./router/auth.js";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:7134",
    credentials: true,
  })
);
// Datenbank verbinden
connectDB();
//  Logger aktivieren
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//  Willkommen Controller


app.use(errorHandler);

app.listen(3000, () => console.log("Server läuft auf Port 3000"));