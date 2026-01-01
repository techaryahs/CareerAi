import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD USER SECURELY ON STARTUP
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

      // Fetch profile from backend to verify session & get user data
      const fetchProfile = async () => {
        try {
          const res = await api.get("/api/auth/me");
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.error("Auth initialization failed:", err);
          // Only logout if token is definitely invalid (401)
          if (err.response?.status === 401) {
            logout();
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, authToken) => {
    console.log("✅ Logging in user:", userData);
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
