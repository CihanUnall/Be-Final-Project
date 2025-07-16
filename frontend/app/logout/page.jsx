"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Context'i ekle

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth(); // logout fonksiyonunu context'ten al

  useEffect(() => {
    logout(); // Context üzerinden kullanıcıyı çıkış yap
    router.push("/login"); // yönlendir
  }, [logout, router]);

  return <p>Logging out...</p>;
}
