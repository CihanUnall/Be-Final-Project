import express from "express";
import dotenv from "dotenv";
import cors from "cors";
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
app.get("/", welcomeRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
