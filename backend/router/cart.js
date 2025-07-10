const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// POST /api/cart → Ürün sepete ekle
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

// GET /api/cart → Sepeti getir
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    if (!cart) return res.status(200).json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

module.exports = router;
