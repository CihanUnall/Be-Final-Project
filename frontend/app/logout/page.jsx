"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Token entfernen
    localStorage.removeItem("token");

    // Weiterleiten zur Login-Seite oder Startseite
    router.push("/login");
  }, [router]);

  return <p>Logging out...</p>;
}
