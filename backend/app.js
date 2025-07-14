import express from "express";
import logger from "./middleware/logger.js";
import authRoutes from "./router/authRoutes.js";
import productRoutes from "./router/productRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import validate from "./middleware/validate.js";
import welcomeController from "./controller/productController.js";

const app = express();
app.use(express.json());

//  Logger aktivieren
app.use(logger);
app.use(validate);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//  Willkommen Controller
app.get("/", welcomeController);

app.use(errorHandler);

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
