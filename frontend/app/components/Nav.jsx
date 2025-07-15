"use client";
import React from "react";
import Link from "next/link";

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
            <Link href="/product">Product</Link>
          </li>
          |
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
      <div className="ml-6 bg-blue-300 p-2 rounded-md">
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Nav;
