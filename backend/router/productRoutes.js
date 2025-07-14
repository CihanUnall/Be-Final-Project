import express from "express";
import productController from "../controllers/productController.js";
import validate from "../middleware/validate.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.post(
  "/",
  authMiddleware,
  validate.validateProduct,
  productController.createProduct
);

router.put("/:id", authMiddleware, productController.updateProduct);

router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;
