"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <nav>
      <div>
        <ul>
          <li>
            {/* <Link href="/login">Login</Link> */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent px-4 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-transparent px-4 py-2 rounded"
              >
                Login
              </button>
            )}
          </li>
          |
          <li>
            <Link href="/products">Product</Link>
          </li>
          |
          <li>
            <Link href="/register">Register</Link>
          </li>
          |
          <li>
            <Link href="/admin">Admin</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Nav;
