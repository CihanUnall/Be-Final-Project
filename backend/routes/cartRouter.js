import { addToCart, getCart } from "../controller/cartController.js";
import express from "express";
const router = express.Router();

router.post("/", addToCart); // POST /api/cart
router.get("/", getCart); // GET /api/cart

export default router;
