import {
  addToCart,
  getCart,
  removeCartItem,
} from "../controller/cartController.js";
import express from "express";
const router = express.Router();

router.post("/", addToCart); // POST /api/cart
router.get("/", getCart); // GET /api/cart
router.delete("/:productId", removeCartItem); // DELETE /api/cart/:productId

export default router;
