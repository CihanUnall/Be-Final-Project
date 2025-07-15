"use client";
import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Extract unique categories
  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        window.location.href = "/basket";
      } else {
        const err = await response.json();
        alert("Could not add to cart:" + err.error);
      }
    } catch (error) {
      console.error("Cart error:", error);
      alert("Server Error!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-2 text-2xl text-gray-800 font-bold">Product Page</h1>
      <div className="mb-4">
        <label className="mr-2 font-medium">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <ul className="text-gray-700 p-4 space-y-4">
        {filteredProducts.map((product) => (
          <li
            key={product.id || product._id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="mt-2 flex justify-between text-sm font-medium">
              <span>${product.price}</span>
              <span className="text-blue-600">
                {token ? (
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="text-blue-60 w-20 h-8 bg-amber-300 ml-5"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm ml-6">
                    You must be logged in to add to cart.
                  </span>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
