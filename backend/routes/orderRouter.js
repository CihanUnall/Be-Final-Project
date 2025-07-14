import express from "express";
import { createOrder } from "../controller/orderController.js";

const router = express.Router();

router.post("/", createOrder); // POST /api/order

export default router;
