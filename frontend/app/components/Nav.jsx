"use client";
import React from "react";
import Link from "next/link";
import Basket from "../components/Basket.jsx";

function Nav() {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link href="/login">Login</Link>
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

      <div className="h-14 w-14 ml-10">
        <Basket />
      </div>
    </nav>
  );
}

export default Nav;
