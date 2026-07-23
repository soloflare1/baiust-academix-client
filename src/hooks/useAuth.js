import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch {
      localStorage.removeItem("token");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async (email, password, isAdminLogin = false) => {
    const { data } = await api.post("/auth/login", { email, password, isAdminLogin });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, studentId, password) => {
    const { data } = await api.post("/auth/register", { name, email, studentId, password });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, register, logout };
}

