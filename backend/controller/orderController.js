import Order from "../models/OrderSchema.js";
import Cart from "../models/CartSchema.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne(); // user'sız

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ error: "The cart is empty. Order cannot be placed." });
    }

    const order = new Order({
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      total: 0, // ürün fiyatı olmadığı için 0
      createdAt: new Date(),
    });

    await order.save();

    cart.items = []; // sepeti temizle
    await cart.save();

    res
      .status(201)
      .json({ message: "The order was created successfully.", order });
  } catch (err) {
    console.error("Order creation error:", err.message, err.stack); // detaylı log
    res.status(500).json({ error: "The order could not be created." });
  }
};
