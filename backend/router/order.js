const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// POST /api/order → Sipariş oluştur
router.post("/", auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Sepet boş" });
    }

    let total = 0;

    // Stok kontrolü ve toplam hesaplama
    for (const item of cart.items) {
      const product = await Product.findById(item.productId._id);
      if (!product || product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Yetersiz stok: ${product.name}` });
      }
      total += product.price * item.quantity;
    }

    // Stokları azalt
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = new Order({
      userId,
      items: cart.items.map((i) => ({
        productId: i.productId._id,
        quantity: i.quantity,
      })),
      total,
    });

    await order.save();
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Sipariş oluşturuldu", order });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

// GET /api/order → Kullanıcının siparişlerini getir
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate(
      "items.productId"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});

module.exports = router;
