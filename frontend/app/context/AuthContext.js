"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // burada kullanıcı bilgisi tutulur

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // İsteğe bağlı: token'ı decode edip kullanıcı bilgisi çekebilirsin
      setUser({ token }); // örnek olarak sadece token saklanıyor
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
