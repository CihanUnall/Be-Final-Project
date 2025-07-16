"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Basket from "../components/Basket.jsx";

function Nav() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // context'ten çıkış yap
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200">
      <ul className="flex gap-4 items-center">
        <li>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-transparent px-4 py-2 rounded hover:cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-transparent px-4 py-2 rounded hover:cursor-pointer"
            >
              Login
            </button>
          )}
        </li>
        <li>
          <Link href="/products">Product</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>

      <div className="h-14 w-14 ml-10">
        <Basket />
      </div>
    </nav>
  );
}

export default Nav;
