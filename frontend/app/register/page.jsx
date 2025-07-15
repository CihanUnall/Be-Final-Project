"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Etwas ist schiefgelaufen");
      setMessage("Registrierung erfolgreich!");
      // Nach 1 Sekunde zur Login-Seite
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      setMessage(` ${err.message}`);
    }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "4rem auto",
        fontFamily: "Arial",
        textAlign: "center",
        padding: "4rem",
        border: "1px solid black",
        borderRadius: "8px",
        backgroundColor: "#F9F9F9",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Registrieren</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.5rem",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.5rem",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.5rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4A90E2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Registrieren
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            borderRadius: "8px",
            color: "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}