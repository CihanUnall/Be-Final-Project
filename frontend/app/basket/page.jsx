"use client";
import { useEffect, useState } from "react";

export default function Basket() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/cart");
      const data = await res.json();
      setCartItems(data.items || []);
      setLoading(false);
    } catch (err) {
      console.error("Cart could not be retrieved:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cart/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchCart();
    } catch (err) {
      console.error("The product could not be deleted:", err);
    }
  };

  const placeOrder = async () => {
    setPlacingOrder(true);
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
      });

      if (res.ok) {
        setOrderSuccess(true);
        setCartItems([]);
      } else {
        alert("Order could not be placed.");
      }
    } catch (err) {
      console.error("Order error:", err);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Shopping Cart</h1>

      {orderSuccess && (
        <p className="text-green-600 font-semibold mb-4">
          Order created successfully!
        </p>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.productId?.name || "The product has been deleted"}
                    </h2>
                    <p className="text-gray-600">
                      {item.productId?.price?.toFixed(2)}₺ x {item.quantity}{" "}
                      quantity
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="bg-red-500 hover:bg-blue-500 text-white px-3 py-1 rounded ml-14"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <button
              onClick={placeOrder}
              disabled={placingOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-lg"
            >
              {placingOrder ? "Ordering..." : "Complete Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
