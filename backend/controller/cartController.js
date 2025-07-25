import Cart from "../models/CartSchema.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Gelen veriyi logla
  console.log("Incoming Data:", { productId, quantity });

  try {
    let cart = await Cart.findOne(); // userId olmadan sepeti bul

    if (!cart) {
      cart = new Cart({ items: [{ productId, quantity }] });
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
    res.status(500).json({ error: "An error occurred while adding to cart." });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ items: [], message: "Warenkorb ist leer" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Could not retrieve the cart:", err);
    res.status(500).json({ error: "The basket could not be retrieved." });
  }
};
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne();

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    // Filtrele: bu ürün dışındakileri tut
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    console.error("Cart DELETE error:", err.message);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};
