import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./db/mongoose.connect.js";
import { welcomeRouter } from "./router/welcomeRouter.js";
import authRoutes from "./router/auth.js";

const app = express();
const PORT = process.env.PORT || 5517;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:7134",
    credentials: true,
  })
);
//Routes
app.use("/", welcomeRouter);
app.use("/api/auth", authRoutes);
// Datenbank verbinden
connectDB();
// Server starten
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
