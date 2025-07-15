"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function BasketIcon() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        const totalItems = data.items?.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(totalItems || 0);
      })
      .catch((err) => {
        console.error("Unable to retrieve cart data:", err);
        setCartCount(0);
      });
  }, []);

  return (
    <div className="relative h-14 w-14 ml-10">
      <Link href="/basket">
        <img
          src="/basket.png"
          alt="shopping basket"
          className="w-10 h-10 mt-2 "
        />

        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
