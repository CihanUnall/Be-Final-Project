"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const dummyUser = { name: "Welcome back!" };
    setUser(dummyUser);
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center h-100 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="text-lg mb-6">You are successfully logged in.</p>
      <Link
        href="/products"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        To the Product Page
      </Link>
    </div>
  );
}
