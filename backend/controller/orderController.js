import Order from "../models/OrderSchema.js";
import Cart from "../models/CartSchema.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    // Get cart and product details
    const cart = await Cart.findOne().populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ error: "The cart is empty. Order cannot be placed." });
    }

    // Calculate total price
    let total = 0;
    const orderItems = cart.items.map((item) => {
      const price = item.productId.price;
      const quantity = item.quantity;
      total += price * quantity;

      return {
        productId: item.productId._id,
        quantity,
      };
    });

    // Create order
    const order = new Order({
      items: orderItems,
      total,
      createdAt: new Date(),
    });

    await order.save();
    // Clear cart
    cart.items = [];
    await cart.save();

    res
      .status(201)
      .json({ message: "The order was created successfully.", order });
  } catch (err) {
    console.error("Order creation error:", err.message, err.stack);
    res.status(500).json({ error: "The order could not be created." });
  }
};
